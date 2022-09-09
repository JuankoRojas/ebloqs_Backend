import { Transactions } from "src/transactions/entitys/transactions.entity";
import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";


@CustomRepository(Transactions)
export class UserEntRepository extends Repository<Transactions> {

}