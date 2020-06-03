import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class AuthEmailDTO {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;
}