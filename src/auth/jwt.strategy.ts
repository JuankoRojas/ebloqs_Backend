import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import config from '../config';
import { ConfigType } from '@nestjs/config';
import { UserEnt } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminEntRepository } from '../admins/repository/admin.repository';
import { AdminEnt } from '../admins/entities/admin.entity';
import { JwtPayload } from './models/jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        @Inject(config.KEY)
        private readonly configService: ConfigType<typeof config>
    ) {
        //console.log(ExtractJwt.fromAuthHeaderAsBearerToken())
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.jwtsecret,
        });
    }

    async validate(payload: any) {
        //console.log(`${payload['userId']} has been successfully authenticated.`);
        return { userId: payload['userId'], username: payload.username };
    }

    async validateAdmin(payload: JwtPayload) {
        console.log(payload)
        const user = payload;
            if (user.status != true)
                throw new UnauthorizedException('User is inactive, talk whit an admin.')


        return user;
    }
}
