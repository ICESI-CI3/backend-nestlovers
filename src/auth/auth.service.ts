import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
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

    async login(loginDto: LoginDto) {
        const user = await this.userService.findOneByEmail(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Email not found');
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return 'login';
    }
}
