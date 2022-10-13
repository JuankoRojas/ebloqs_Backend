import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { AdminEnt } from "../entities/admin.entity";


@CustomRepository(AdminEnt)
export class AdminEntRepository extends Repository<AdminEnt> {

}