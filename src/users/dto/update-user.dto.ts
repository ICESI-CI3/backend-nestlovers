import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    readonly name: string;

    @IsEmail()
    readonly email: string;

    @MinLength(6)
    readonly password: string;
}
