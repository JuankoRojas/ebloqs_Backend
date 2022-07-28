import {
    Injectable,
    UnauthorizedException,
    HttpException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'deviceID',
        });
    }

    async validate(email: string, deviceID: string): Promise<any> {
        try {
            const user = await this.authService.validateUser(email, deviceID);
            if (!user) {
                return new UnauthorizedException('No user found credentials');
            }
            return user;
        } catch (e) {
            console.log(e);
            throw new HttpException(e.message, e.status);
        }
    }
}
