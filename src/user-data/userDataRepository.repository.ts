import { Repository, EntityRepository } from "typeorm";
import { UserData } from "./userData.entity";
import { User } from "src/auth/user.entity";
import { NotFoundException, UnauthorizedException, InternalServerErrorException } from "@nestjs/common";
import { UpdateProfileDTO } from "./dto/updateProfileDto.dto";
import { UpdateFirstNameDto } from "./dto/updateFirstNameDto.dto";

@EntityRepository(UserData)
export class UserDataRepository extends Repository<UserData> {

    async setUserData(user: User): Promise<void>{
        const { email, username, role } = user
        const data = new UserData()
        data.createdAt = new Date()
        data.id = parseInt(user.id, 10)
        data.username = username
        data.email = email
        data.role = role
        data.user = user
        await data.save()
        delete data.user
        
    }

    async getUserData( user: User): Promise<UserData> {
        const { username } = user
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException()
        } else {
            return profile
        }
    }

    async updateFirstName(firstNameDto: UpdateFirstNameDto, user: User): Promise<boolean> {
        const { username } = user
        const {firstName} = firstNameDto
        const profile = null
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.firstName = firstName
            await profile.save()
            return true
        }
    }

    async updateProfile(updateDTO: UpdateProfileDTO, user: User): Promise<void> {
        const { username } = user
        
        const {
            firstName,
            lastName,
            avatar,
            cover,
            about,
            intro,
            gender,
            contactInfo,
            place,
            shortcuts,
            socialLinks,
            role
        } = updateDTO

        const profile = await this.findOne({ username })
        if (!profile) {
            throw new UnauthorizedException()
        } else {
            profile.lastName = lastName
            profile.firstName = firstName
            profile.avatar = avatar
            profile.cover = cover
            profile.about = about
            profile.intro = intro
            profile.gender = gender
            profile.contactInfo = contactInfo
            profile.place = place
            profile.shortcuts = shortcuts
            profile.socialLinks = socialLinks
            profile.role = role

            try {
                await profile.save()
            } catch (error) {
                throw new InternalServerErrorException()
            }
        }
    }
}