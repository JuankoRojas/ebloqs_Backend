import { Tokens } from "../entitys/tokens.entity";
import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";


@CustomRepository(Tokens)
export class TokensRepository extends Repository<Tokens> {

}