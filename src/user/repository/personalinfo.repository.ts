import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { PersonalInfo } from '../entities/personal_info.entity'

@CustomRepository(PersonalInfo)
export class PersonalInfoRepository extends Repository<PersonalInfo> {

}