import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { MailerModule } from '@nestjs-modules/mailer'
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter'

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
  ],
})
export class AppModule {}
