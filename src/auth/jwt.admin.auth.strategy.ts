import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import config from '../config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class JwtAdminsStrategy extends PassportStrategy(Strategy, 'admins') {
    constructor(
        @Inject(config.KEY)
        private readonly configService: ConfigType<typeof config>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtsecret,
        });
    }

    async validate(payload: any) {
        const user = payload;
        if (user.status != true)
            throw new UnauthorizedException('User is inactive, talk whit an admin.')


        return user;
    }
}
