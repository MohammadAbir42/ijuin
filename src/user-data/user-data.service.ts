import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDataRepository } from './userDataRepository.repository';
import { User } from 'src/auth/user.entity';
import { UserData } from './userData.entity';
import { UpdateProfileDTO } from './dto/updateProfileDto.dto';
import { UpdateFirstNameDto } from './dto/updateFirstNameDto.dto';

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
    
    async updateProfile(updateDto: UpdateProfileDTO, user: User): Promise<void> {
        return this.userDataRepo.updateProfile(updateDto, user)
    }
}
