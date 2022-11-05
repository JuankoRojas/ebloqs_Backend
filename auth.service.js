"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const apple_signin_auth_1 = require("apple-signin-auth");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user/user.service");
const admins_service_1 = require(".././admins/services/admins.service");
const AuthConfig_1 = require("./appleAuth/AuthConfig");
let AuthService = class AuthService {
    constructor(usersService, adminService, jwtService) {
        this.usersService = usersService;
        this.adminService = adminService;
        this.jwtService = jwtService;
    }
    async validatePasswordUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            try {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    const { password } = user, result = __rest(user, ["password"]);
                    return result;
                }
                else {
                    throw new common_1.UnauthorizedException('invalid pass');
                }
            }
            catch (error) {
                throw new common_1.HttpException('pass not found', 301);
            }
        }
        else {
            throw new common_1.HttpException('User not found', 302);
        }
    }
    async validateUser(email, deviceID) {
        const user = await this.usersService.findByEmail(email);
        if (user) {
            if (user.deviceID == deviceID) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException('Device unauthorized');
            }
        }
        else {
            throw new common_1.UnauthorizedException('User not found');
        }
    }
    async validateAdmin(email, password) {
        const admin = await this.adminService.findByEmail(email);
        if (admin) {
            const verify = await bcrypt.compare(password, admin.password);
            if (verify) {
                return admin;
            }
            else {
                throw new common_1.UnauthorizedException('User unauthorized');
            }
        }
        else {
            throw new common_1.UnauthorizedException('User not found');
        }
    }
    async login(user) {
        const validUser = await this.validateUser(user.email, user.deviceID);
        const payload = { userId: validUser.id, deviceID: validUser.deviceID, username: validUser.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async registerUser(userData) {
        try {
            const user = await this.usersService.findByEmail(userData.email);
            if (user) {
                return {
                    ok: false,
                    messagge: `Esta email ya se encuentra registrado a una cuenta.`
                };
            }
            else {
                const userRegister = await this.usersService.create(userData);
                const payload = {
                    userId: userRegister.id,
                    deviceID: userRegister.deviceID,
                };
                return {
                    access_token: this.jwtService.sign(payload),
                };
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async registerAdmin(userData) {
        try {
            const user = await this.adminService.findByEmail(userData.email);
            if (user) {
                return {
                    ok: false,
                    messagge: `Esta email ya se encuentra registrado a una cuenta.`
                };
            }
            else {
                const userRegister = await this.adminService.create(userData);
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
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async loginAdmin(user) {
        const validAdmin = await this.validateAdmin(user.email, user.password);
        const payload = { userId: validAdmin.id, user_name: validAdmin.name, user_lastname: validAdmin.lastname, rol: validAdmin.rol, status: validAdmin.status };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async getProfileByToken(loginDto, res) {
        try {
            const data = await apple_signin_auth_1.default.verifyIdToken(loginDto, {
                audience: [
                    process.env.BUNDLE_ID,
                    process.env.SERVICE_ID
                ],
            });
            return res.json({ data });
        }
        catch (error) {
            console.log(`Callback error: ${error}`);
            throw new common_1.HttpException(error, 500);
        }
    }
    async appleCallBack(req) {
        console.log("---------------------- Appple Callback -------------------");
        try {
            const redirect = `intent://callback?${new URLSearchParams(req.body).toString()}#Intent;package=${AuthConfig_1.ANDROID_PACKAGE_IDENTIFIER};scheme=signinwithapple;end`;
            console.log(`Redirecting to ${redirect}`);
            return { url: redirect };
        }
        catch (error) {
            console.log(`Callback error: ${error}`);
        }
        console.log("---------------------- -------------------");
    }
    async signinApple(req) {
        const AppleAuth = require('apple-auth');
        const jwt = require("jsonwebtoken");
        console.log("---------------------- Appple SignIn -------------------");
        try {
            console.log(req === null || req === void 0 ? void 0 : req.body);
            const auth = new AppleAuth({
                client_id: req.query.useBundleId === "true"
                    ? AuthConfig_1.authAppleKey.BUNDLEID
                    : AuthConfig_1.authAppleKey.SERVICEID,
                team_id: AuthConfig_1.authAppleKey.SERVICEID,
                redirect_uri: AuthConfig_1.authAppleKey.APPLE_REDIRECT_URL,
                key_id: AuthConfig_1.authAppleKey.KEYID,
            }, AuthConfig_1.authAppleKey.KEYP8.replace(/\|/g, "\n"), "text");
            console.log("--------------------APPLE SIGN IN -------------------");
            console.log(req.query);
            const accessToken = await auth.accessToken(req.query.code);
            const idToken = jwt.decode(accessToken.id_token);
            const userID = idToken.sub;
            console.log(idToken);
            const userEmail = idToken.email;
            const userName = `${req.query.firstName} ${req.query.lastName}`;
            const sessionID = `NEW SESSION ID for ${userID} / ${userEmail} / ${userName}`;
            console.log(`sessionID = ${sessionID}`);
            return { sessionId: sessionID };
        }
        catch (error) {
            console.log(`signInWithApple error: ${error}`);
        }
        console.log("---------------------- -------------------");
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        admins_service_1.AdminsService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map