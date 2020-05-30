import { Controller, UseGuards, Get, Post, Patch, Body, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDataService } from './user-data.service';
import { User } from 'src/auth/user.entity';
import { GetUserDataDec } from '../auth/getUserData.decorator';
import { UserData } from './userData.entity';
import { UpdateProfileDTO } from './dto/updateProfileDto.dto';

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

    @Patch()
    async updateProfile(
        @Body(ValidationPipe) updateDto: UpdateProfileDTO,
        @GetUserDataDec() user: User,
    ): Promise<void> {
        return this.userDataService.updateProfile(updateDto, user)
    }
}
