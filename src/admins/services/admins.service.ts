import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from '../dto/create-admin.dto';
import { AdminEnt } from '../entities/admin.entity';
import { AdminEntRepository } from '../repository/admin.repository';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from '../../auth/models/roles.model';

@Injectable()
export class AdminsService {

    constructor(
        @InjectRepository(AdminEnt, 'mysqlDB') private adminRepo: AdminEntRepository

    ) { }

    async create(createAdminDto: CreateAdminDto) {
        try {
            const user = await this.findByEmail(createAdminDto.email.toLowerCase());
            if (user) {
                return {
                    ok: false,
                    messagge: `Esta email ya se encuentra registrado a una cuenta.`
                }
            } else {
                const admin = <AdminEnt>{
                    id: uuidv4(),
                    email: createAdminDto.email.toLowerCase(),
                    name: `${createAdminDto.name.toLowerCase()}`,
                    lastname: createAdminDto.lastname.toLowerCase(),
                    password: await bcrypt.hash(createAdminDto.password, 10),
                    create: new Date(),
                    update: new Date(),
                    rol: createAdminDto.role
                };

                const newUser = await this.adminRepo.save(admin);

                return newUser;
            }


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
            const adminsGroupExeptSuperAdmin = []
            const admins = await this.adminRepo.find();
            for (const admin of admins) {
                if(admin.rol !=  Role.PRO){
                    adminsGroupExeptSuperAdmin.push(admin);
                }
            }
            return { admins : adminsGroupExeptSuperAdmin }
        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }

    async setRol(id: string, rol: number) {
        try {
            const message = `User # ${id} updated rol.`
            switch (rol) {
                case 0: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: "0" })
                    return { ok: true, message }
                }
                case 1: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: "1" })

                    return { ok: true, message }
                }
                case 2: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: "2" })
                    return { ok: true, message }
                }
                case 3: {
                    const transaction = await this.adminRepo.update({ id: id }, { rol: "3" })
                    return { ok: true, message }
                }
            }
        } catch (e: any) {
            throw new HttpException(e.mesagge, 500)
        }
    }

    async statusAccountAdmin(id: string) {
        try {
            const user_admin = await this.adminRepo.findOne({ where: { id: id } });
            if (user_admin.status === true) {

                const disable = await this.adminRepo.update({ id: id }, { status: false });
                return { message: `User ${user_admin.name} ${user_admin.lastname} with id ${user_admin.id} is disabled.` }
            }
            else {
                const enabled = await this.adminRepo.update({ id: id }, { status: true })
                return { message: `User ${user_admin.name} ${user_admin.lastname} with id ${user_admin.id} is enabled.` }
            }

        } catch (e) {
            throw new BadRequestException(e.mesagge)
        }
    }

    async updateAdmin(updateAdminDto: AdminEnt) {
        try {
            const adminVerify = await this.adminRepo.findBy({ id: updateAdminDto.id });
            if (adminVerify.length > 0) {
                const admin = {
                    id: updateAdminDto.id,
                    email: updateAdminDto.email.toLowerCase(),
                    name: `${updateAdminDto.name.toLowerCase()}`,
                    lastname: updateAdminDto.lastname.toLowerCase(),
                    update: new Date(),
                    rol: updateAdminDto.rol
                };
                const updateUser = await this.adminRepo.update({ id: admin.id }, admin);
                return { messagge: 'user updated', admin };
            } else {
                return { messagge: `User with id : ${updateAdminDto.id} not found.` };
            }

        } catch (e) {
            throw new BadRequestException(e.mesagge)
        }

    }

    async deleteAdmin(id: string) {
        try {
            const adminVerify = await this.adminRepo.findBy({ id: id });
            if (adminVerify.length > 0) {

                const updateUser = await this.adminRepo.delete({ id: id });
                return { ok: true, messagge: 'Admin deleted' };
            } else {
                return { messagge: `User with id : ${id} not found.` };
            }

        } catch (e) {
            throw new BadRequestException(e.mesagge)
        }
    }
}
