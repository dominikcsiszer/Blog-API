import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class UserDTO {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    fullname: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string
}