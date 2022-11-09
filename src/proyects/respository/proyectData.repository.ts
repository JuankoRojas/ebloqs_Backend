import { ProyectsData } from "../entitys/proyectData.entity";
import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";


@CustomRepository(ProyectsData)
export class ProyectsDataRepository extends Repository<ProyectsData> {

}