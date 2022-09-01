import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { ClientsController } from './controllers/clients.controller';

import { AddressRepository } from '../user/repository/address.repository'
import { UserEntRepository } from '../user/repository/user.repository'
import { DocumentsRepository } from '../user/repository/document.repository'
import { PersonalInfoRepository } from '../user/repository/personalinfo.repository'
import { AddressService } from './services/address.service';
import { DocumentsService } from './services/documents.service';
import { Storages3Service } from '../storages3/storages3.service';
import { TypeOrmExModule } from '../typeorm/typeorm-ex.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { UserEnt } from './entities/user.entity';
import { Documents } from './entities/document.entity';
import { PersonalInfo } from './entities/personal_info.entity';

@Global()
@Module({
    imports: [
    //     TypeOrmExModule.forCustomRepository([
    //     AddressRepository,
    //     DocumentsRepository,
    //     PersonalInfoRepository,
    //     UserEntRepository,
    // ]),
        TypeOrmModule.forFeature([Address, UserEnt, Documents, PersonalInfo], 'mysqlDB')
    ],
    controllers: [UserController, ClientsController],
    providers: [UserService, AddressService, DocumentsService, Storages3Service],
    exports: [UserService],
})
export class UserModule {}
