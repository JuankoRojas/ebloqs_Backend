import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { UserEnt } from '../entities/user.entity'

@CustomRepository(UserEnt)
export class UserEntRepository extends Repository<UserEnt> {

}