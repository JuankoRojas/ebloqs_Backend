import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import config from '../config';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AdminStrategy } from './admin.strategy';
import { AdminsModule } from '../admins/admins.module';
import { JwtAdminsStrategy } from './jwt.admin.auth.strategy';

@Module({
    imports: [
        AdminsModule,
        UserModule,
        PassportModule,
        ConfigModule,
        JwtModule.registerAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                return {
                    secret: configService.jwtsecret,
                    signOptions: {
                        expiresIn: '60d',
                    },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, AdminStrategy, JwtAdminsStrategy],
})
export class AuthModule { }
