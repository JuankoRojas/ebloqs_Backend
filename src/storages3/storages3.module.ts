import { Global, Module } from '@nestjs/common';
import { Storages3Service } from './storages3.service';

@Global()
@Module({
  providers: [Storages3Service]
})
export class Storages3Module {}
