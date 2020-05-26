import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { JwtPayload } from './jwt/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp (authCredDTO: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredDTO)
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
}
