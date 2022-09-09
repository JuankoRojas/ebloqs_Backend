import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrasactionDto } from '../dto/createTransaction.dto';
import { Transactions } from '../entitys/transactions.entity';
import { TransactionsRepository } from '../repository/transactions.repository';
@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transactions, 'mysqlDB') private transactionsRepo: TransactionsRepository,
    ) { }

    async create(createTransactionDto: CreateTrasactionDto) {
        try {
            const transaction = <Transactions>{
                id : createTransactionDto.id,
                customer : createTransactionDto.customer,
                receiver : createTransactionDto.receiver,
                amount : createTransactionDto.amount,
                type : createTransactionDto.type,
                status : createTransactionDto.status
            };
            const newTransaction = await this.transactionsRepo.save(transaction);
            return newTransaction;

        } catch (e) {
            throw new HttpException(e, 500)
        }
    }

}



