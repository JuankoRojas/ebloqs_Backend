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

    async getAll() {
        try {
            const users = await this.adminRepo.find();
            return { users }
        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }

    async setRol(id: string, rol: number) {
        try {
            const message = `User # ${id} updated rol.`
            switch (rol) {
                case 0: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: 0 })
                    return { ok: true, message }
                }
                case 1: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: 1 })

                    return { ok: true, message }
                }
                case 2: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: 2 })
                    return { ok: true, message }
                }
                case 3: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: 3 })
                    return { ok: true, message }
                }
            }
        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }
}
