import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailsService } from 'src/emails/emails.service';
import { ClientsController } from './controllers/clients.controller';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User], 'mysqlDB')],
    controllers: [UserController, ClientsController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
