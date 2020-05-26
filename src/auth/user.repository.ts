import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt'
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { UserRole } from "./userRole.enum";
import { InternalServerErrorException, ConflictException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp (authCredDTO: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredDTO

        const user = this.create()
        user.username = username
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


    async hashPassword (password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}