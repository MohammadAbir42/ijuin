import { Module } from '@nestjs/common';
import { UserDataController } from './user-data.controller';
import { UserDataService } from './user-data.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDataRepository } from './userDataRepository.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDataRepository]),
    AuthModule,
  ],
  controllers: [UserDataController],
  providers: [UserDataService]
})
export class UserDataModule {}
