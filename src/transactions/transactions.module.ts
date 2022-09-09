import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './entitys/transactions.entity';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionsService } from './services/transactions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transactions], 'mysqlDB'), HttpModule],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {}
