import { IsString } from "class-validator";

export class UpdateLastNameDTO {
    @IsString()
    lastName: string
}