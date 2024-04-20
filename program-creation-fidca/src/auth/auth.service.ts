import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
    ) {}

    async register(registerDto: RegisterDto) {
        const user = await this.userService.findOneByEmail(registerDto.email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        const name = registerDto.name;
        const email = registerDto.email;
        const password = await bcryptjs.hash(registerDto.password, 10);

        return await this.userService.create({
            name, 
            email,
            password
        });
    }

    login() {
        return 'login';
    }
}
