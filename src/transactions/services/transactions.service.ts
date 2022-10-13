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
            var type: string = "";
            if (createTransactionDto.type === 0) { type = "bank"; }
            if (createTransactionDto.type === 1) { type = "card"; }


            const transaction = <Transactions>{
                id: createTransactionDto.id,
                customer: createTransactionDto.customer,
                receiver: createTransactionDto.receiver,
                amount: createTransactionDto.amount,
                customer_name: createTransactionDto.customer_name.toLocaleLowerCase(),
                payment_number : createTransactionDto.payment_number,
                type: type
            };
            const newTransaction = await this.transactionsRepo.save(transaction);
            return newTransaction;

        } catch (e: any) {
            console.log(e.message);
            return (e.messagge, 500)
        }
    }

    async getAllTransactions() {
        try {
            const transactionsBank = await this.transactionsRepo.findBy({ type: "bank" });
            const transactionsCard = await this.transactionsRepo.findBy({ type: "card" });
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
                    const transaction = await this.transactionsRepo.update({ id: id }, { status: 0 })
                    return { ok: true, message }
                }
                case 1: {
                    const transaction = await this.transactionsRepo.update({ id: id }, { status: 1 })

                    return { ok: true, message }
                }
                case 2: {
                    const transaction = await this.transactionsRepo.update({ id: id }, { status: 2 })
                    return { ok: true, message }
                }
            }

        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }

    // funtion para filtrar las transacciones y retornar por tipos.
    async getByType(typeToFront: number) {
        try {
            var type: string = "";
            if (typeToFront === 0) { type = "bank"; }
            if (typeToFront === 1) { type = "card"; }
            const filter = await this.transactionsRepo.findBy({ type: type });
            return { data: filter }
        } catch (e: any) {
            console.log(e.message)
            throw new HttpException(e.mesagge, 500)
        }
    }
    // function para obtener el monto de las transacciones y retornar los balances de cada uno.
    async getBalances() {
        try {
            var balanceBank: number = 0;
            var balanceCard: number = 0;
            const dataBank = await this.transactionsRepo.findBy({ type: "bank" });
            const dataCard = await this.transactionsRepo.findBy({ type: "card" });
            for (const data of dataBank) {
                const convertion = parseInt(data.amount)
                balanceBank += convertion;
            }

            for (const data of dataCard) {
                const convertion = parseInt(data.amount)
                balanceCard += convertion;
            }
            return { balance_Bank: balanceBank, balance_Card: balanceCard, total_Balance: (balanceBank + balanceCard) }
        } catch (e: any) {
            console.log(e.message)
            throw new HttpException(e.mesagge, 500)
        }
    }
}



