import { Module } from '@nestjs/common';
import { ProyectsController } from './controllers/proyects.controller';
import { ProyectsService } from './services/proyects.service';

@Module({
  controllers: [ProyectsController],
  providers: [ProyectsService]
})
export class ProyectsModule {}
