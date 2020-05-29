import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class AuthPasswordResetDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    username: string;
}