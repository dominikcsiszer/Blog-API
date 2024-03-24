import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDTO } from 'src/user/user.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //@UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        console.log('User authenticated:', req.body);
        const response = await this.authService.login(req.body);
        console.log('Login response:', response);
        return response;
    }

    @Post('register')
    async register(@Body() body: UserDTO) {
        return await this.authService.register(body);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refresh(@Request() req) {
        console.log('User authenticated:', req.body);
        const response = await this.authService.refreshToken(req.body);
        console.log('Login response:', response);
        return response;
    }
}
