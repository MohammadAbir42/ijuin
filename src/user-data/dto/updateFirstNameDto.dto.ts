import { IsString } from "class-validator";

export class UpdateFirstNameDto {
    @IsString()
    firstName: string
}