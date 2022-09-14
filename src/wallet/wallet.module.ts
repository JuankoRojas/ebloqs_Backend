import { forwardRef, Global, Module } from '@nestjs/common';
import { WalletService } from './service/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entitys/wallet.entity';
import { BlockchainService } from './service/blockchain.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet], 'mysqlDB'), HttpModule
  ],
  controllers: [WalletController],
  providers: [WalletService, BlockchainService],
  exports: [WalletService, BlockchainService]
})
export class WalletModule { }
