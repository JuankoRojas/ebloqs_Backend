import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Req() payload: Request) {
        return this.authService.login(payload.user);
    }

    @UseGuards(AuthGuard('admin'))
    @Post('/admin')
    async loginadmin(@Req() payload: Request) {
        console.log('hioasdna')
        return this.authService.login(payload.user);
    }

    // @UseGuards(LocalAuthGuard)
    @Post('/register')
    async register(@Body() payload: CreateUserDto) {
        return this.authService.registerUser(payload);
    }
    
    @Post('/callback')
    async loginwithAppleinAdroid(@Req() payload: Request, @Res() res: Response) {
        return this.authService.callbackApple(payload.body, res);
    }
    
    @Post('/callback/signinWithApple')
    async loginwithApple(@Body() request: Request, @Res() res:Response) {
        return this.authService.signinApple(request, res);
    }
}
