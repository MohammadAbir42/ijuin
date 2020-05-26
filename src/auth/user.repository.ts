import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { UserRole } from "./userRole.enum";
import { InternalServerErrorException } from "@nestjs/common";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp (authCredDTO: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredDTO

        const user = this.create()
        user.username = username
        user.password = password
        user.role = UserRole.USER
        
        try {
            await user.save()
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async signIn (authCredDTO: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredDTO
        const user = await this.findOne({ username })

        if (user) {
            return username
        } else {
            return null
        }
    }
}