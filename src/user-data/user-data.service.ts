import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDataRepository } from './userDataRepository.repository';
import { User } from 'src/auth/user.entity';
import { UserData } from './userData.entity';
import { UpdateProfileDTO } from './dto/updateProfileDto.dto';
import { UpdateFirstNameDto } from './dto/updateFirstNameDto.dto';
import { UpdateLastNameDTO } from './dto/updateLastNameDTO.dto';
import { UpdateAvatarDTO } from './dto/updateAvatarDTO.dto';
import { UpdateCoverDTO } from './dto/updateCoverDTO.dto';
import { UpdateAboutDTO } from './dto/updateAboutDTO.dto';
import { UpdateIntroDTO } from './dto/updateIntroDTO.dto';
import { UpdatePlaceDTO } from './dto/updatePlaceDto.dto';

@Injectable()
export class UserDataService {
    constructor(
        @InjectRepository(UserDataRepository)
        private userDataRepo: UserDataRepository,
    ) {}

    async setUserData(user: User): Promise<void> {
        return this.userDataRepo.setUserData(user)
    }

    async getUserData(user: User): Promise<UserData> {
        return this.userDataRepo.getUserData(user)
    }

    async updateFN(firstNameDTO: UpdateFirstNameDto, user: User): Promise<boolean> {
        return this.userDataRepo.updateFirstName(firstNameDTO, user)
    }

    async updateLN(lastNameDTO: UpdateLastNameDTO, user: User): Promise<boolean> {
        return this.userDataRepo.updateLastName(lastNameDTO, user)
    }

    async updateAvatar(avatarDTO: UpdateAvatarDTO, user: User): Promise<boolean> {
        return this.userDataRepo.updateAvatar(avatarDTO, user)
    }

    async updateCover(coverDTO: UpdateCoverDTO, user: User): Promise<boolean> {
        return this.userDataRepo.updateCover(coverDTO, user)
    }

    async updateAbout(aboutDTO: UpdateAboutDTO, user: User): Promise<boolean> {
        return this.userDataRepo.updateAbout(aboutDTO, user)
    }

    async updateIntro(introDTO: UpdateIntroDTO, user: User): Promise<boolean> {
        return this.userDataRepo.updateIntro(introDTO, user)
    }

    async updatePlace(placeDTO: UpdatePlaceDTO, user: User): Promise<boolean> {
        return this.userDataRepo.updatePlace(placeDTO, user)
    }
    
    async updateProfile(updateDto: UpdateProfileDTO, user: User): Promise<void> {
        return this.userDataRepo.updateProfile(updateDto, user)
    }
}
