import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { JwtPayload } from './jwt/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthSignUpCredentialsDto } from './dto/authSIgnUpCredentials.dto';
import { JwtSignUpPayload } from './jwt/jwtSignUpPayload.interface';
import { AuthPasswordResetDto } from './dto/authPasswordResetDto.dto';
import { AuthPasswordChangeDto } from './dto/authPasswordChangeDto.dto';
import { User } from './user.entity';
import { AuthUsernameDTO } from './dto/authUsernameDto.dto';
import { AuthEmailDTO } from './dto/emailCheck.dto';


@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    async usernameCheck(authUsername: AuthUsernameDTO): Promise<boolean> {
        const { username } = authUsername
        const user = await this.userRepository.findOne({ username })
        

        if (user) {
            throw new ConflictException("This username already exists!!")
        } else {
            return true
        }
    }

    async emailCheck(authEmail: AuthEmailDTO): Promise<boolean> {
        const { email } = authEmail
        const user = await this.userRepository.findOne({ email })

        if (user) {
            throw new ConflictException("This Email already exists!!")
        } else {
            return true
        }
    }

    async preSignUp(authSignUpCredDTO: AuthSignUpCredentialsDto): Promise<{ accessToken: string }> {
        const { email, username, password } = authSignUpCredDTO
        
        
        if (!await this.userRepository.findOne({ email }) && !await this.userRepository.findOne({ username })) {
            const payload: JwtSignUpPayload = { email, username, password }
            const accessToken = await this.jwtService.sign(payload)
            await this.mailerService.sendMail({
                to: `${email}`,
                from: 'abirhassan142442@gmail.com',
                subject: 'Testing NestJs Mailer Service',
                text: `${username}'s access token: ${{accessToken}}`,
                html: `<h3>${username}'s access token: </h3><p>${accessToken}</p>`
            //          <p>Please use the following link to activate your acccount:</p>
            //         < p > ${ process.env.CLIENT_URL } / account / activate / ${ token } < /p>
            //         < hr />
            // <p>This email may contain sensetive information < /p>
            }).then().catch((e) => {
                console.log(e);
                
            })
            return {accessToken}// don't need to send it
        } else {
            throw new ConflictException()
        }
    }

    async signUp (token: string): Promise<void> {
        const { email, username, password } = await this.jwtService.verify(token)

        const authSignUpCredDTO: AuthSignUpCredentialsDto = { email, username, password }
        return this.userRepository.signUp(authSignUpCredDTO)
    }

    async signIn (authCredDTO: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.signIn(authCredDTO)

        if (!username) {
            throw new UnauthorizedException()
        }

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)

        return { accessToken }
    }

    async tryResetPassword(authPasswordReset: AuthPasswordResetDto): Promise<{ accessToken: string }> {
        const { username } = authPasswordReset
        const user = await this.userRepository.findOne({ username })
        if (user) {
            const email = user.email
            const payload: JwtPayload = { username }
            const accessToken = await this.jwtService.sign(payload)
            await this.mailerService.sendMail({
                to: `${email}`,
                from: 'abirhassan142442@gmail.com',
                subject: 'Testing NestJs Mailer Service',
                text: `${username}'s access token: ${{ accessToken }}`,
                html: `<h3>${username}'s access token for reset password: </h3><p>${accessToken}</p>`
            }).then().catch()
            return { accessToken }
        } else {
            throw new UnauthorizedException()
        }
        
    }

    async resetPassword(token: string): Promise<void> {
        const { username } = await this.jwtService.verify(token)
        const user = await this.userRepository.findOne({ username })
        if (user) {
            try {
                user.password = await this.userRepository.hashPassword(username, user.salt)
                await user.save()
            } catch (error) {
                throw new InternalServerErrorException()
            }
        } else {
            throw new UnauthorizedException()
        }
    }

    async changePassword(authPasswordChangeDTO: AuthPasswordChangeDto, user: User): Promise<void> {
        // const user = this.jwtService.verify(token)
        return this.userRepository.changePassword(authPasswordChangeDTO, user)
    }
}
