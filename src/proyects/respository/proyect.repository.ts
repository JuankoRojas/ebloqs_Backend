import { Proyects } from "../entitys/proyect.entity";
import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";


@CustomRepository(Proyects)
export class ProyectsRepository extends Repository<Proyects> {

}