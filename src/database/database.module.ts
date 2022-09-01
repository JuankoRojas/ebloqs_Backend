import { Global, Module, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';


@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            name: 'mysqlDB',
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                
                try {
                    return {
                        type: 'mysql',
                        database: configService.mysql.dbName,
                        // port: configService.mysql.port,
                        password: configService.mysql.password,
                        user: configService.mysql.user,
                        host: configService.mysql.host,
                        synchronize: false,
                        
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
