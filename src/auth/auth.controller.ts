import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserCreateDTO } from 'src/user/user.dto';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Request() req): Promise<{accessToken: string}> {
        const response = await this.authService.signIn(req.body.email, req.body.password);
        return response;
    }

    @Post('register')
    async register(@Body() body: UserCreateDTO): Promise<string> {
        return await this.authService.signUp(body);
    }
}
