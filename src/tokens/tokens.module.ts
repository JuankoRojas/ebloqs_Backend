import { Module } from '@nestjs/common';
import { TokensController } from './controllers/tokens.controller';
import { Tokens } from './entitys/tokens.entity';
import { TokensService } from './services/tokens.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Tokens], 'mysqlDB'), HttpModule],
  controllers: [TokensController],
  providers: [TokensService],
  exports:[TokensService]
})
export class TokensModule {}
