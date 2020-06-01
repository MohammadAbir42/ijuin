import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoryRepository } from './storyRepository.repository';

@Injectable()
export class StoryService {
    constructor(
        @InjectRepository(StoryRepository)
        private storyrepo: StoryRepository
    ) {}
}
