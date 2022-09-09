import { Transactions } from "../entitys/transactions.entity";
import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";


@CustomRepository(Transactions)
export class TransactionsRepository extends Repository<Transactions> {

}