import { Module } from '@nestjs/common';
import { WalletService } from './service/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entitys/wallet.entity';
import { BlockchainService } from './service/blockchain.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet], 'mysqlDB'), HttpModule],
  controllers: [WalletController],
  providers: [WalletService, BlockchainService]
})
export class WalletModule {}
