import {
    IsString,
    ValidateNested,
    IsOptional,
    ArrayMinSize,
    MinLength,
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsEmpty,
} from "class-validator"
import { Type } from "class-transformer"
import { BlogAuthorDTO, MetadataDTO } from "src/types/global.dto";
import { Status } from "./blog.types";
import { Disallow } from "src/types/global.types";

export class BlogDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    title: string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    content: string

    @IsEmpty()
    @ValidateNested()
    @Type(() => BlogAuthorDTO)
    author: BlogAuthorDTO;

    @IsOptional()
    @ArrayMinSize(1)
    @IsString({ each: true })
    tags: string[];

    @IsOptional()
    @IsString()
    slug: string;

    @IsOptional()
    @IsEnum(Status)
    status: Status;

    @IsOptional()
    @IsString()
    featuredImageUrl: string;

    @IsOptional()
    @ValidateNested()
    @Type(() => MetadataDTO)
    metadata: MetadataDTO;

    @IsOptional()
    @IsDate()
    createdAt: Date

    @IsOptional()
    @IsDate()
    updatedAt: Date
}

export class UpdateBlogDTO extends BlogDTO {
    @Disallow()
    createdAt: Date

    @IsOptional()
    title: string

    @IsOptional()
    content: string

    @IsOptional()
    author: BlogAuthorDTO;

    @IsOptional()
    tags: string[];

    @IsOptional()
    slug: string;

    @IsOptional()
    status: Status;

    @IsOptional()
    featuredImageUrl: string;
}