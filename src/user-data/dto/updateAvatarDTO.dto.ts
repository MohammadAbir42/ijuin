import { IsString } from "class-validator";

export class UpdateAvatarDTO {
    @IsString()
    avatar: string
}