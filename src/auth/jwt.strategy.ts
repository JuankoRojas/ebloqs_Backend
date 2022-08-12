import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';

import config from '../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(config.KEY)
        private readonly configService: ConfigType<typeof config>,
    ) {
        console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtsecret,
        });
    }

    async validate(payload: any) {
        console.log(`${payload['userid']} has been successfully authenticated.`);
        return { userId: payload['userid'], username: payload.username };
    }
}
