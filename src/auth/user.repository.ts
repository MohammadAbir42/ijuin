import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { UserRole } from "./userRole.enum";
import { InternalServerErrorException, ConflictException, UnauthorizedException } from "@nestjs/common";
import { AuthSignUpCredentialsDto } from "./dto/authSIgnUpCredentials.dto";
import { AuthPasswordChangeDto } from "./dto/authPasswordChangeDto.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp (authSignUpCredDTO: AuthSignUpCredentialsDto): Promise<void> {
        const { email, username, password } = authSignUpCredDTO

        const user = this.create()
        user.email = email.trim()
        user.username = username.trim()
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)
        user.role = UserRole.USER
        
        try {
            await user.save()
        } catch (error) {
            if (error.code === '23505') { // duplicate username error code
                throw new ConflictException(`Username '${username}' already exists.`)
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    async signIn (authCredDTO: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredDTO
        const user = await this.findOne({ username })

        if (user && await user.validatePassword(password)) {
            return username
        } else {
            return null
        }
    }

    async changePassword (authPasswordChangeDTO: AuthPasswordChangeDto, user: User): Promise<void> {
        const { password, newPassword } = authPasswordChangeDTO
        
        const getPassword = await this.hashPassword(password, user.salt)
        if (user.password === getPassword) {
            user.password = await this.hashPassword(newPassword, user.salt)
            try {
                await user.save()
            } catch (error) {
                throw new InternalServerErrorException()
            }
        } else {
            throw new UnauthorizedException()
        }
    }

    async hashPassword (password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}