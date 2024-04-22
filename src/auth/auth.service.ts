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

    /**
     * Register a new user. 
     * 
     * @param registerDto The user data to register
     * @returns The user information if the registration is successful. An error otherwise.
     */
    async register(registerDto: RegisterDto) {
        const user = await this.userService.findOneByEmail(registerDto.email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        const name = registerDto.name;
        const email = registerDto.email;
        const password = await bcryptjs.hash(registerDto.password, 10);

        await this.userService.create({
            name, 
            email,
            password
        });

        return {
            name,
            email,
        };
    }

    /**
     * Login a user. 
     * 
     * @param loginDto The user data to login
     * @returns The JWT token if the login is successful. An error otherwise.
     */
    async login(loginDto: LoginDto) {
        const user = await this.userService.findByEmailWithPassword(loginDto.email);

        if (!user) {
            throw new UnauthorizedException('Email not found');
        }

        const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, email: user.email, role: user.role };
        const token = await this.jwtService.signAsync(payload); // Generates JWT token

        return {
            token,
        };
    }

    async profile({ email, role }: { email: string, role: string }) {
        return await this.userService.findOneByEmail(email);
    }
}
