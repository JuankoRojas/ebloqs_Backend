import { Global, Module, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Address } from 'src/user/entities/address.entity';
import { Documents } from 'src/user/entities/document.entity';
import { PersonalInfo } from 'src/user/entities/personal_info.entity';
import { Wallet } from 'src/wallet/entitys/wallet.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'mysqlDB',
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                console.log(config.KEY);
                try {
                    return {
                        type: 'mysql',
                        database: configService.mysql.dbName,
                        // port: configService.mysql.port,
                        password: configService.mysql.password,
                        user: configService.mysql.user,
                        host: configService.mysql.host,
                        entities: [User, Address, Documents, PersonalInfo, Wallet],
                        synchronize: true,
                        autoLoadEntities: true,
                        ssl: false,
                    };
                } catch (e) {
                    throw new UnauthorizedException({
                        message: 'Hubo un error de integración de datos',
                    });
                }
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
