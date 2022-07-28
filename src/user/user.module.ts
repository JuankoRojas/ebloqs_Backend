import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([User], 'mysqlDB')],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
