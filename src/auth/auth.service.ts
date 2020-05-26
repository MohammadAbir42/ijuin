import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp (authCredDTO: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredDTO)
    }

    async signIn (authCredDTO: AuthCredentialsDto): Promise<string> {
        const username = await this.userRepository.signIn(authCredDTO)

        if (!username) {
            throw new UnauthorizedException()
        }

        return username
    }
}
