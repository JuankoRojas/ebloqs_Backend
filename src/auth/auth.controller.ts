import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    // 2- login usuarios
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    login(@Body() payload) {
        return this.authService.login(payload);
    }

    @UseGuards(AuthGuard('admin'))
    @Post('/admin')
    async loginadmin(@Req() payload: Request) {
        return this.authService.login(payload['user']);
    }

    // 1- registro usuario
    @Post('/register')
    async register(@Body() payload: CreateUserDto) {
        return this.authService.registerUser(payload);
    }



    // >>>> no funcional <<<<
    @Post('/callback')
    async loginwithAppleinAdroid(@Req() payload: Request, @Res() res: Response) {
        return this.authService.callbackApple(payload.body, res);
    }
    // >>>> no funcional <<<<
    @Post('/callback/signinwithapple')
    async loginwithApple(@Body() request: Request, @Res() res: Response) {
        return this.authService.signinApple(request, res);
    }
}
