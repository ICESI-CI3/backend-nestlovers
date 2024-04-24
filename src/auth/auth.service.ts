import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    private tokenExpirationTime = 24;

    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
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

        this.whitelistToken(token);

        return {
            token,
        };
    }

    /**
     * Whitelists a token to allow access to the application.
     * 
     * Each token has an expiration date that is the current date plus 24 hours.
     * 
     * Note: As this system can work with DBs placed in different timezones, it is recommended to adjust the expiration date to an according one with the timezone of the DB.
     * 
     * @param token The token to whitelist.
     * @returns The token if it is successfully whitelisted. An message otherwise.
     */
    async whitelistToken(token: string) {
        const tokenExists = await this.tokenRepository.findOneBy({ token });
        
        if (tokenExists) {
            return { message: 'Token already exists' };
        }

        const currentdate = new Date(Date.now());
        const expirationdate = new Date(currentdate); 
        expirationdate.setHours(expirationdate.getHours() + this.tokenExpirationTime); // Expires in 24 hours

        return await this.tokenRepository.save({ token, expirationdate });
    }

    /**
     * Logout a user.
     * 
     * @param token The token to logout.
     * @returns The token if it is successfully logged out. An message otherwise.
     */
    async logout(token: string) {
        const tokenExists = await this.findToken(token);
        
        if (!tokenExists) {
            // throw new UnauthorizedException('Invalid token');
            return { message: 'Invalid token' };
        }

        return await this.tokenRepository.delete(tokenExists.id);
    }

    /**
     * Find a token in the whitelist.
     * 
     * @param token The token to find.
     * @returns The token if it is found. An message otherwise.
     */
    async findToken(token: string) {
        return await this.tokenRepository.findOneBy({ token });
    }

    async profile({ email, role }: { email: string, role: string }) {
        return await this.userService.findOneByEmail(email);
    }

    /**
     * Register multiple users with seed data.
     * 
     * @param users The users to register.
     */
    async registerUsersWithSeedData(users: RegisterDto[]) {
          for (const user of users) {
            const userExists = await this.userService.findOneByEmail(user.email);

            if (!userExists) {
                await this.register(user);
            }
        }
    }
}
