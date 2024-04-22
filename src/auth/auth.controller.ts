import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorators';
import { UserActive } from 'src/common/decorators/user-active.decorator';
import { UserActiveI } from 'src/common/interfaces/user-active.interface';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    /**
     * The register method is a POST route handler that receives a registerDto object as an argument. This object contains the user's information to create a new account.
     * 
     * @param registerDto The user's information to create a new account.
     * @returns The user's information.
     */
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ) {
        return this.authService.register(registerDto);
    }

    /**
     * The login method is a POST route handler that receives a loginDto object as an argument. This object contains the user's credentials to authenticate the user.
     * 
     * @param loginDto The user's credentials to authenticate the user.
     * @returns The user's information and a token.
     */
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ) {
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @Auth([ Role.ADMIN ])
    profile(
        @UserActive() 
        user: UserActiveI,
    ) {
        return this.authService.profile(user);
    }
}
