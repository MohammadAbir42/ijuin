import { IsString } from "class-validator";

export class UpdateCoverDTO {
    @IsString()
    cover: string
}