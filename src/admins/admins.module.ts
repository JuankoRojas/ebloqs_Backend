import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AdminsController } from './controllers/admins.controller';
import { AdminEnt } from './entities/admin.entity';

import { AdminsService } from './services/admins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEnt], 'mysqlDB')],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports : [AdminsService]
})
export class AdminsModule { }
