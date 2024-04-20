import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

    // @IsString()
    // readonly phone: string;
}