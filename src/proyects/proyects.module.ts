import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storages3Service } from '../storages3/storages3.service';
import { ProyectsController } from './controllers/proyects.controller';
import { Proyects } from './entitys/proyect.entity';
import { ProyectsData } from './entitys/proyectData.entity';
import { ProyectsFeatured } from './entitys/proyectFeatured.entity';
import { ProyectsTokenomic } from './entitys/proyectTokenomic.entity';
import { ProyectsService } from './services/proyects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proyects, ProyectsData, ProyectsTokenomic, ProyectsFeatured], 'mysqlDB'), HttpModule],
  controllers: [ProyectsController],
  providers: [ProyectsService, Storages3Service, JwtService]
})
export class ProyectsModule { }
