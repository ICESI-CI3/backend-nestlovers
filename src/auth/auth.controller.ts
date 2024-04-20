import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request, request } from 'express';
import { Roles } from './decorators/roles.decorators';
import { RolesGuard } from './guard/roles.guard';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './decorators/auth.decorators';

// Define a new interface called RequestWithUser that extends the Request interface from Express. This interface will be used to define the user property in the request object.
interface RequestWithUser extends Request {
    user: {
        email: string;
        role: string;
    };
}

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
        @Req() 
        request: RequestWithUser,
    ) {
        // This is an example of how to restrict access to a route based on the user's role. However, this is not optimal because there can be many endpoints, and this logic will be repeated in all of them. Instead, use guards to protect routes.
        // if (role !== 'admin') {
        //     throw new UnauthorizedException('You are unauthorized to access this resource');
        // }

        return this.authService.profile(request.user);
    }
}
