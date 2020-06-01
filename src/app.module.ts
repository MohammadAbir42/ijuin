import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'
import { UserDataModule } from './user-data/user-data.module';
import { StoryModule } from './story/story.module';
import { SubjectModule } from './subject/subject.module';
import { ReplyModule } from './reply/reply.module';
import { QuestionModule } from './question/question.module';
import { CommentModule } from './comment/comment.module';
import { PollModule } from './poll/poll.module';
import { ClassroomModule } from './classroom/classroom.module';
import { PostModule } from './post/post.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtps://abirhassan142442@gmail.com:rxubrmwqsvdxifir@smtp.gmail.com',
        defaults: {
          from: `'Ijuin' website <abirhassan>`
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    UserDataModule,
    StoryModule,
    SubjectModule,
    ReplyModule,
    QuestionModule,
    CommentModule,
    PollModule,
    ClassroomModule,
    PostModule,
    OrganizationModule,
  ],
})
export class AppModule {}
