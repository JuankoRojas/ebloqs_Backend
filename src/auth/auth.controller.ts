import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
// import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthAppleLoginDto } from './dtos/apple.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Req() payload: Request) {
        return this.authService.login(payload.user);
    }

    // @UseGuards(LocalAuthGuard)
    @Post('/register')
    async register(@Body() payload: CreateUserDto) {
        return this.authService.registerUser(payload);
    }
 
    @Post('/apple')
    async loginwithApple(@Body() payload: AuthAppleLoginDto) {
        return this.authService.getProfileByToken(payload);
    } 

    @Post('/callback')
    async loginwithAppleinAdroid(@Req() payload: Request) {
        return this.authService.signinwithApple(payload.body);
    }

    // @Post('/social')
    // async loginSocial(@Body() payload: CreateUserDto) {
    //     return this.authService.loginSocial(payload);
    // }
}
