import { Repository } from "typeorm";
import { CustomRepository } from "../../typeorm/typeorm-ex.decorator";
import { Address } from '../entities/address.entity'

@CustomRepository(Address)
export class AddressRepository extends Repository<Address> {

}