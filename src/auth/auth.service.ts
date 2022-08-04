import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthAppleLoginDto } from './dtos/apple.dto';

import appleSigninAuth from 'apple-signin-auth';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, deviceID: string): Promise<User> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            console.log(deviceID);
            console.log(user);
            const isMatch = user.deviceID.indexOf(deviceID);
            if (isMatch != -1) {
                return user;
            } else {
                throw new UnauthorizedException('Device unauthorized');
            }
        } else {
            throw new UnauthorizedException('User not found');
        }
    }

    async login(user: any) {
        const validUser = await this.validateUser(user.email, user.deviceID);
        const payload = { userid: validUser.id, deviceID: validUser.deviceID };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerUser(userData: CreateUserDto) {
        try {
            const userRegister = await this.usersService.create(userData);
            const payload = {
                userid: userRegister.id,
                deviceID: userRegister.deviceID,
            };
            return {
                access_token: this.jwtService.sign(payload),
            };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    async getProfileByToken(
        loginDto: AuthAppleLoginDto,
      ): Promise<any> {
        try {
            const data = await appleSigninAuth.verifyIdToken(loginDto.authorizationCode, {
              audience: process.env.BUNDLE_ID,
            });
        
            return {
              id: data.sub,
              email: data.email,
            };
            
        } catch (error) {
            throw new HttpException(error, 500)
        }
      }

    // async registerUserSocial(userData: CreateUserDto) {
    //     const userRegister = await this.usersService.createOfSocial(userData);
    //     const payload = { username: userRegister.role, sub: userRegister.id };

    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
}
