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
                id: createTransactionDto.id,
                customer: createTransactionDto.customer,
                receiver: createTransactionDto.receiver,
                amount: createTransactionDto.amount,
                type: createTransactionDto.type,
                status: createTransactionDto.status
            };
            const newTransaction = await this.transactionsRepo.save(transaction);
            return newTransaction;

        } catch (e: any) {
            throw new HttpException(e.messagge, 500)
        }
    }

    async getAllTransactions() {
        try {
            const transactionsBank = await this.transactionsRepo.findBy({ type: "banco" });
            const transactionsCard = await this.transactionsRepo.findBy({ type: "credit/debit" });
            return { transactionsBank, transactionsCard }
        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }

    async updateStatusTransactionsBank(id: string, status: number) {
        try {
            const message = `Transaction # ${id} updated.`
            switch (status) {
                case 0: {
                    const transaction = await this.transactionsRepo.update({ id: id }, { status: "pending" })
                    return { ok: true, message }
                }
                case 1: {
                    const transaction = await this.transactionsRepo.update({ id: id }, { status: "pay out" })

                    return { ok: true, message }
                }
                case 2: {
                    const transaction = await this.transactionsRepo.update({ id: id }, { status: "not payed" })
                    return { ok: true, message }
                }
            }

        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }

}



