import { Controller, Logger, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController')
    constructor ( private authService: AuthService) {}

    @Post('/signup')
    async signUp (@Body(ValidationPipe) authCredDTO: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredDTO)
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) authCredDTO: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredDTO)
    }
}
