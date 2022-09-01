import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { Documents } from '../entities/document.entity'

@CustomRepository(Documents)
export class DocumentsRepository extends Repository<Documents> {

}