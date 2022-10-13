import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminEnt } from '../entities/admin.entity';
import { AdminEntRepository } from '../repository/admin.repository';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(AdminEnt, 'mysqlDB') private adminRepo: AdminEntRepository

    ) { }

    async create(createAdminDto: CreateAdminDto) {
        try {
            const admin = <AdminEnt>{
                id: uuidv4(),
                email: createAdminDto.email.toLowerCase(),
                name: `${createAdminDto.name.toLowerCase()}`,
                lastname: createAdminDto.lastname.toLowerCase(),
                password: await bcrypt.hash(createAdminDto.password, 10),
                create: new Date(),
                update: new Date(),
            };

            const newUser = await this.adminRepo.save(admin);

            return newUser;

        } catch (e: any) {
            console.log(e.message);
            throw new HttpException(e.message, 500)
        }
    }

    findByEmail(email: string) {
        return this.adminRepo.findOneBy({ email: email });
    }
}
