import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, deviceID: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            return user;
        } else {
            throw new UnauthorizedException(
                'No se encontró un usuario con este email',
            );
        }
    }

    async login(user: any) {
        const payload = { username: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async registerUser(userData: CreateUserDto) {
        try {
            const userRegister = await this.usersService.create(userData);
            console.log(userRegister);
            const payload = {
                deviceID: userRegister.deviceID,
                role: 'consumer',
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
