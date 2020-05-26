import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class AuthCredentialsDto {
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