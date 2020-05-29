import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class AuthPasswordChangeDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    newPassword: string;
}