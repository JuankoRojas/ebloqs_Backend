import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { DatabaseModule } from './database/database.module';
import { environment } from './enviroment';
import { UserModule } from './user/user.module';
import { EmailsModule } from './emails/emails.module';
import { WalletModule } from './wallet/wallet.module';
import { Storages3Module } from './storages3/storages3.module';
import { LoggerModule } from 'nestjs-pino';
import { TransactionsModule } from './transactions/transactions.module';
import { TokensModule } from './tokens/tokens.module';
import { AdminsModule } from './admins/admins.module';
import { ProyectsModule } from './proyects/proyects.module';

@Module({
    imports: [
        LoggerModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: environment[process.env.NODE_ENV] || '.env',
            load: [config],
            isGlobal: true,
            
            // validationSchema: Joi.object({}),
        }),
        DatabaseModule,
        AuthModule,
        WalletModule,
        UserModule,
        EmailsModule,
        Storages3Module,
        TransactionsModule,
        TokensModule,
        AdminsModule,
        ProyectsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
