import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './controllers/clients.controller';

import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Documents } from './entities/document.entity';
import { PersonalInfo } from './entities/personal_info.entity';
import { AddressService } from './services/address.service';
import { DocumentsService } from './services/documents.service';
import { Storages3Service } from 'src/storages3/storages3.service';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([
        User,
        Address,
        Documents,
        PersonalInfo,
    ], 'mysqlDB')],
    controllers: [UserController, ClientsController],
    providers: [UserService, AddressService, DocumentsService, Storages3Service],
    exports: [UserService],
})
export class UserModule {}
