import { Gender } from "../gender.enum";
import { UserRole } from "src/auth/userRole.enum";
import { IsOptional, IsString, IsObject, IsArray, MaxLength } from "class-validator";

export class UpdateProfileDTO {
    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    avatar: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    about: string;

    @IsOptional()
    @IsString()
    cover:string;

    @IsOptional()
    @IsString()
    contactInfo: string;

    @IsOptional()
    @IsString()
    gender: Gender;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    intro: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    place: string;

    @IsOptional()
    @IsString()
    role: UserRole;

    @IsOptional()
    @IsArray()
    shortcuts: string[];

    @IsOptional()
    @IsObject()
    socialLinks: {
        facebook: string;
        twitter: string;
        linkedin: string;
        instagram: string;
    };
}