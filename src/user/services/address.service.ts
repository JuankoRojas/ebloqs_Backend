import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from '../dto/create_addres.dto';
import { Address } from '../entities/address.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(Address, 'mysqlDB') private addressRepo: Repository<Address>,
    ) {}

    async createAddresFromUser(userId, addres: CreateAddressDto) {
        var newAdd = <Address> {
            id: uuidv4(),
            country: addres.country,
            city: addres.city,
            postalCode: addres.postalCode,
            address1: addres.address1,
            ownerID: userId,
        }

        const creadres = await this.addressRepo.create(newAdd);

        return await this.addressRepo.save(creadres);
    }
}
