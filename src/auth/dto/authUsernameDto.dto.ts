import { IsString, MinLength, MaxLength, IsNotEmpty } from "class-validator";

export class AuthUsernameDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username: string;
}