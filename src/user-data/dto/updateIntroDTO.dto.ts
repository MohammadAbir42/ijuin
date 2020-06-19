import { IsString, MaxLength } from "class-validator";

export class UpdateIntroDTO {
    @IsString()
    @MaxLength(100)
    intro: string
}