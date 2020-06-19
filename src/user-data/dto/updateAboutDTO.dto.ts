import { IsString, MaxLength } from "class-validator";

export class UpdateAboutDTO {
    @IsString()
    @MaxLength(500)
    about: string
}