import { Controller, UseGuards, Get, Post, Patch, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDataService } from './user-data.service';
import { User } from 'src/auth/user.entity';
import { GetUserDataDec } from '../auth/getUserData.decorator';
import { UserData } from './userData.entity';
import { UpdateProfileDTO } from './dto/updateProfileDto.dto';
import { UpdateFirstNameDto } from './dto/updateFirstNameDto.dto';
import { UpdateLastNameDTO } from './dto/updateLastNameDTO.dto';
import { UpdateAvatarDTO } from './dto/updateAvatarDTO.dto';
import { UpdateCoverDTO } from './dto/updateCoverDTO.dto';
import { UpdateAboutDTO } from './dto/updateAboutDTO.dto';
import { UpdateIntroDTO } from './dto/updateIntroDTO.dto';
import { UpdatePlaceDTO } from './dto/updatePlaceDto.dto';

@Controller('user-data')
@UseGuards(AuthGuard())
export class UserDataController {
    constructor(private userDataService: UserDataService) {}

    @Post()
    async setUserData(@GetUserDataDec() user: User): Promise<void> {
        return this.userDataService.setUserData(user)
    }

    @Get()
    async getUserData(@GetUserDataDec() user: User): Promise<UserData> {
        return this.userDataService.getUserData(user)
    }

    @Patch('/firstName')
    async changeFirstName(
        @Body(ValidationPipe) firstNameDTO: UpdateFirstNameDto,
        @GetUserDataDec() user: User
    ): Promise<boolean> {        
        return this.userDataService.updateFN(firstNameDTO, user)
    }

    @Patch('/lastName')
    async changeLastName(
        @Body(ValidationPipe) lastNameDto: UpdateLastNameDTO,
        @GetUserDataDec() user: User
    ): Promise<boolean> {
        return this.userDataService.updateLN(lastNameDto, user)
    }

    @Patch('/avatar')
    async changeAvatar(
        @Body(ValidationPipe) avatarDto: UpdateAvatarDTO,
        @GetUserDataDec() user: User
    ): Promise<boolean> {
        return this.userDataService.updateAvatar(avatarDto, user)
    }

    @Patch('/cover')
    async changeCover(
        @Body(ValidationPipe) coverDto: UpdateCoverDTO,
        @GetUserDataDec() user: User
    ): Promise<boolean> {
        return this.userDataService.updateCover(coverDto, user)
    }

    @Patch('/about')
    async changeAbout(
        @Body(ValidationPipe) aboutDto: UpdateAboutDTO,
        @GetUserDataDec() user: User
    ): Promise<boolean> {
        return this.userDataService.updateAbout(aboutDto, user)
    }

    @Patch('/intro')
    async changeIntro(
        @Body(ValidationPipe) introDto: UpdateIntroDTO,
        @GetUserDataDec() user: User
    ): Promise<boolean> {
        return this.userDataService.updateIntro(introDto, user)
    }

    @Patch('/place')
    async changePlace(
        @Body(ValidationPipe) placeDto: UpdatePlaceDTO,
        @GetUserDataDec() user: User
    ): Promise<boolean> {
        return this.userDataService.updatePlace(placeDto, user)
    }

    @Patch()
    async updateProfile(
        @Body(ValidationPipe) updateDto: UpdateProfileDTO,
        @GetUserDataDec() user: User,
    ): Promise<void> {
        return this.userDataService.updateProfile(updateDto, user)
    }
}
