import { IsString, MaxLength } from "class-validator";

export class UpdatePlaceDTO {
    @IsString()
    @MaxLength(100)
    place: string
}