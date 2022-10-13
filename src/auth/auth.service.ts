import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import AppleAuth, { AppleAuthConfig } from "apple-auth";
import appleSigninAuth from 'apple-signin-auth';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserEnt } from '../user/entities/user.entity';
import { AdminsService } from '.././admins/services/admins.service';
import { CreateAdminDto } from 'src/admins/dto/create-admin.dto';
import { AdminEnt } from 'src/admins/entities/admin.entity';


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
        const payload = { userid: validUser.id, deviceID: validUser.deviceID, username: validUser.name };
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
                    userid: userRegister.id,
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
                const userRegister = await this.adminService.create(userData);
                const payload = {
                    userid: userRegister.id,
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
        const payload = { userid: validAdmin.id, user_name: validAdmin.name, user_lastname: validAdmin.lastname, rol: validAdmin.rol };
        return {
            access_token: this.jwtService.sign(payload),
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
    // >>>> no funcional <<<<
    async callbackApple(request: Request, res: Response) {
        try {
            const redirect = `intent://callback?${new URLSearchParams(
                request.body
            ).toString()}#Intent;package=${process.env.ANDROID_PACKAGE_IDENTIFIER
                };scheme=signinwithapple;end`;

            console.log(`Redirecting to ${redirect}`);

            return res.redirect(307, redirect)
        } catch (error) {
            console.log(`Callback error: ${error}`);
            throw new Error(error);
        }
    }
    // >>>> no funcional <<<<
    async signinApple(request: Request, res: Response) {
        try {
            const configAuth = <AppleAuthConfig>{
                client_id: 'com.ebloqs.signinservice',
                team_id: process.env.TEAM_ID,
                redirect_uri: "https://agile-beach-41948.herokuapp.com/auth/callback/signinwithapple",
                key_id: process.env.KEY_ID,
            };

            const auth = new AppleAuth(
                configAuth,
                process.env.KEY_CONTENTS,
                "text"
            );

            console.log(request['code'])

            const accessToken = await auth.accessToken(request['code'].toString());

            return this.getProfileByToken(accessToken.id_token, res);
        } catch (error) {
            console.log(`signInWithApple error: ${error}`);
            throw new HttpException(error, 500);
        }
    }
}
