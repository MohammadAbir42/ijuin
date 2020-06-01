import { Module } from '@nestjs/common';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryRepository } from './storyRepository.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoryRepository])
  ],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule {}
