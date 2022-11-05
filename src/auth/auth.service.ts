import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import appleSigninAuth from 'apple-signin-auth';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as file from 'fs'


import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEnt } from '../user/entities/user.entity';
import { AdminsService } from '.././admins/services/admins.service';
import { CreateAdminDto } from '../admins/dto/create-admin.dto';
import { AdminEnt } from '../admins/entities/admin.entity';
import { authAppleKey } from '../keys/AuthConfig';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private adminService: AdminsService,
        private jwtService: JwtService,
    ) { }

    async validatePasswordUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user) {

            try {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { password, ...result } = user;
                    // console.log(result);
                    return result;
                } else {
                    throw new UnauthorizedException('invalid pass');
                }
            } catch (error) {
                throw new HttpException('pass not found', 301)
            }
        } else {
            throw new HttpException('User not found', 302);
        }
    }




    async validateUser(email: string, deviceID: string): Promise<UserEnt> {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            if (user.deviceID == deviceID) {
                return user;
            } else {
                throw new UnauthorizedException('Device unauthorized');
            }
        } else {
            throw new UnauthorizedException('User not found');
        }

    }

    async validateAdmin(email: string, password: string): Promise<AdminEnt> {
        const admin = await this.adminService.findByEmail(email);
        if (admin) {
            const verify = await bcrypt.compare(password, admin.password)
            if (verify) {
                return admin;
            } else {
                throw new UnauthorizedException('User unauthorized');
            }
        } else {
            throw new UnauthorizedException('User not found');
        }
    }
    //1- login
    async login(user: any) {
        const validUser = await this.validateUser(user.email, user.deviceID);
        const payload = { userId: validUser.id, deviceID: validUser.deviceID, username: validUser.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    // 2- registro de usuarios
    async registerUser(userData: CreateUserDto) {
        try {
            const user = await this.usersService.findByEmail(userData.email);
            if (user) {
                return {
                    ok: false,
                    messagge: `Esta email ya se encuentra registrado a una cuenta.`
                }
            } else {
                const userRegister = await this.usersService.create(userData);
                const payload = {
                    userId: userRegister.id,
                    deviceID: userRegister.deviceID,
                };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }

        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    // 2- registro de usuarios
    async registerAdmin(userData: CreateAdminDto) {
        try {
            const user = await this.adminService.findByEmail(userData.email);
            if (user) {
                return {
                    ok: false,
                    messagge: `Esta email ya se encuentra registrado a una cuenta.`
                }
            } else {
                const userRegister: any = await this.adminService.create(userData);
                const payload = {
                    userId: userRegister.id,
                    user_name: userRegister.name,
                    user_lastname: userRegister.lastname,
                    rol: userRegister.rol,
                };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }

        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    //1- login admin
    async loginAdmin(user: any) {
        const validAdmin = await this.validateAdmin(user.email, user.password);
        const payload = { userId: validAdmin.id, user_name: validAdmin.name, user_lastname: validAdmin.lastname, rol: validAdmin.rol, status: validAdmin.status };
        return {
            name: validAdmin.name,
            lastname: validAdmin.lastname,
            access_token: this.jwtService.sign(payload)
        };
    }


    // APPLE SIGNIN
    async getProfileByToken(
        loginDto: string,
        res: Response
    ): Promise<any> {
        try {
            const data = await appleSigninAuth.verifyIdToken(loginDto, {
                audience: [
                    process.env.BUNDLE_ID,
                    process.env.SERVICE_ID
                ],
            });

            return res.json({ data });

        } catch (error) {
            console.log(`Callback error: ${error}`);
            throw new HttpException(error, 500)
        }
    }


    async appleCallBack(req: Request) {
        console.log("---------------------- Appple Callback -------------------")
        try {
            const redirect = `intent://callback?${new URLSearchParams(
                req.body
            ).toString()}#Intent;package=${process.env.ANDROID_PACKAGE_IDENTIFIER
                };scheme=signinwithapple;end`;

            console.log(`Redirecting to ${redirect}`);

            return { url: redirect };
        } catch (error) {
            console.log(`Callback error: ${error}`);
        }
        console.log("---------------------- -------------------")
    }

    // >>>> en fase de prueba <<<<
    async signinApple(req: Request) {
        const AppleAuth = require('apple-auth');
        console.log("---------------------- Appple SignIn -------------------")
        try {
            const authApple = new AppleAuth(
                {
                    // use the bundle ID as client ID for native apps, else use the service ID for web-auth flows
                    // https://forums.developer.apple.com/thread/118135
                    client_id:
                        req.query.useBundleId === "true"
                            ? authAppleKey.BUNDLEID// can use atuthAppleKey.BUNDLEID
                            : authAppleKey.SERVICEID,
                    team_id: authAppleKey.TEAMID,
                    redirect_uri: authAppleKey.APPLE_REDIRECT_URL, // does not matter here, as this is already the callback that verifies the token after the redirection
                    key_id: authAppleKey.KEYID,
                },
                authAppleKey.KEYP8.replace(/\|/g, '\n'),
                "text"
            );

            const accessToken = await authApple.accessToken(req.query.code);
    
            if (accessToken) {
                const decodeToken: any = this.jwtService.decode(accessToken.id_token);
                console.log("------------------APPLE SIGN IN DECODE TOKEN-------------------");
                const regexemail = /\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
                const userName = decodeToken.email.split(regexemail)[0];
                return { name: userName, email: decodeToken.email }
            } else {
                throw new UnauthorizedException({ message: "token not found." })
            }



        } catch (error) {
            console.log(`signInWithApple error: ${error}`);
        }
        console.log("---------------------- -------------------")
    }
}
