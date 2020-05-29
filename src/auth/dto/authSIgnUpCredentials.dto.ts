import { IsString, MinLength, MaxLength, IsNotEmpty, IsEmail } from "class-validator";

export class AuthSignUpCredentialsDto {

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}