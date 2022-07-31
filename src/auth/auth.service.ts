import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

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

    // async loginSocial(userData: CreateUserDto) {
    //     return this.usersService
    //         .findOne(userData.id)
    //         .then((user) => {
    //             if (user) {
    //                 const payload = { username: user.role, sub: user.id };
    //                 return {
    //                     access_token: this.jwtService.sign(payload),
    //                 };
    //             } else {
    //                 return this.registerUserSocial(userData);
    //             }
    //         })
    //         .catch((err) => {
    //             if (err.status === 404) {
    //                 return this.registerUserSocial(userData);
    //             }
    //             console.log('coltala', err.status);
    //         });
    // }

    // async registerUserSocial(userData: CreateUserDto) {
    //     const userRegister = await this.usersService.createOfSocial(userData);
    //     const payload = { username: userRegister.role, sub: userRegister.id };

    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
}
