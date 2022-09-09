import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entitys/transactions.entity';
import { TransactionsController } from './transactions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Transactions], 'mysqlDB'), HttpModule],
    controllers: [TransactionsController],
    //providers: [WalletService, BlockchainService]
})
export class TransactionsModule {}
