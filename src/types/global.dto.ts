import {
    IsString,
    IsEmail,
    IsNumber
} from "class-validator"

export class BlogAuthorDTO {
    @IsString()
    name: string

    @IsString()
    @IsEmail()
    email: string
}

export class MetadataDTO {
    @IsNumber()
    viewCount: number;

    @IsNumber()
    likeCount: number;

    @IsNumber()
    shareCount: number;
}