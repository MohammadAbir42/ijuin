import { Repository, EntityRepository } from "typeorm";
import { UserData } from "./userData.entity";
import { User } from "src/auth/user.entity";
import { NotFoundException, UnauthorizedException, InternalServerErrorException } from "@nestjs/common";
import { UpdateProfileDTO } from "./dto/updateProfileDto.dto";
import { UpdateFirstNameDto } from "./dto/updateFirstNameDto.dto";
import { UpdateLastNameDTO } from "./dto/updateLastNameDTO.dto";
import { UpdateAvatarDTO } from "./dto/updateAvatarDTO.dto";
import { UpdateCoverDTO } from "./dto/updateCoverDTO.dto";
import { UpdateAboutDTO } from "./dto/updateAboutDTO.dto";
import { UpdateIntroDTO } from "./dto/updateIntroDTO.dto";
import { UpdatePlaceDTO } from "./dto/updatePlaceDto.dto";

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
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.firstName = firstName
            await profile.save()
            return true
        }
    }

    async updateLastName(lastNameDTO: UpdateLastNameDTO, user: User): Promise<boolean> {
        const { username } = user
        const { lastName } = lastNameDTO
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.lastName = lastName
            await profile.save()
            return true
        }
    }
    async updateAvatar(avatarDto: UpdateAvatarDTO, user: User): Promise<boolean> {
        const { username } = user
        const { avatar } = avatarDto
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.avatar = avatar
            await profile.save()
            return true
        }
    }

    async updateCover(coverDto: UpdateCoverDTO, user: User): Promise<boolean> {
        const { username } = user
        const { cover } = coverDto
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.cover = cover
            await profile.save()
            return true
        }
    }

    async updateAbout(aboutDto: UpdateAboutDTO, user: User): Promise<boolean> {
        const { username } = user
        const { about } = aboutDto
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.about = about
            await profile.save()
            return true
        }
    }

    async updateIntro(introDto: UpdateIntroDTO, user: User): Promise<boolean> {
        const { username } = user
        const { intro } = introDto
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.intro = intro
            await profile.save()
            return true
        }
    }

    async updatePlace(placeDto: UpdatePlaceDTO, user: User): Promise<boolean> {
        const { username } = user
        const { place } = placeDto
        const profile = await this.findOne({ username })
        if (!profile) {
            throw new NotFoundException(`User with Username: '${username}' does not exists!!`)
            return false
        } else {
            profile.place = place
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