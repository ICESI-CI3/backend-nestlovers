import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { request } from 'http';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto,
    ) {
        console.log(registerDto);
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
    ) {
        console.log(loginDto);
        return this.authService.login(loginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard) // Apply the AuthGuard guard to the route. This will protect the route from unauthorized access.
    profile(
        @Request()
        request
    ) {
        console.log(request.user);
        return 'Profile';
    }
}
