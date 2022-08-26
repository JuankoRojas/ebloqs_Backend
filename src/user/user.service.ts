import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RecoveryUserDto } from './dto/recovery.dto';
import { User } from './entities/user.entity';

import { EmailsService } from 'src/emails/emails.service';
import { PersonalInfo } from './entities/personal_info.entity';
import { UpdatePersonalDataDto } from './dto/personal_data.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User, 'mysqlDB') private userRepo: Repository<User>,
        @InjectRepository(PersonalInfo, 'mysqlDB') private personalInfoRepo: Repository<PersonalInfo>,
        private emailService: EmailsService,
    ) {}

    async create(createUserDto: CreateUserDto) {
        try {
            console.log(createUserDto.type_acount)
            const user = {
                id: uuidv4(),
                email: createUserDto.email.toLowerCase(),
                deviceID: [createUserDto.deviceID],
                typeAcount: `${createUserDto.type_acount}`,
                name: `${createUserDto.name.toLowerCase()}`,
                password: "",
                emailVerificated: false,
                create: new Date(),
                update: new Date(),
            };
            console.log(user)
            const newUser = await this.userRepo.save(user);
            const linkCode = this.generatelinkvalidate(newUser.id);
            console.log(linkCode);
            if(newUser.typeAcount == 'email') {
                await this.emailService.sendVerificationEmails(newUser.email, linkCode);
            }
            return newUser;
        } catch(e) {
            throw new HttpException(e, 500)
        }
    }

    findByEmail(email: string) {
        return this.userRepo.findOne({ where: { email } });
    }

    findOne(id: string) {
        return this.userRepo.findOne({ where: { id } });
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user ${updateUserDto}`;
    }

    updateUserData(user: User) {
        const newUser = this.userRepo.create(user);
        return this.userRepo.save(newUser);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    generatelinkvalidate(id: string) {
        return `https://ebloqs-validate.netlify.app/?code=${id}`;
    }

    async validateEmailUser(code: string) {
        let vuser = await this.findOne(code);
        if(vuser.emailVerificated){
            throw new UnauthorizedException('Este código ya caducó')
        } else {
            vuser.emailVerificated = true;
            await this.userRepo.save(vuser);
            return {
                message: `Correo ${vuser.email} verificado`
            }
        }
    }

    async recoveryUser(user: RecoveryUserDto) {
        const findUser = await this.findByEmail(user.email);
        if(user) {
            findUser.password =  await bcrypt.hash(user.password, 10);
            await this.userRepo.save(findUser);
            return {
                message: 'password changed'
            }
        } else {
            throw new HttpException('user not found', 302);
        }

    }

    async getAllUsers() {
        var listClients =  await this.userRepo.findBy({})
        var listTitleName = listClients.map((v) => {
            return v.name[0];
        })

        var listNames = listClients.map(v => {
            return {
                id: v.id,
                name: v.name,
                email: v.email,
            };
        })

        var titleWithOutDuplicate = listTitleName.sort().filter((value, index) => {
            return listTitleName.indexOf(value)  === index;
        })

        var listCostumers = titleWithOutDuplicate.map((c) => {
            let data = {
                title: c,
                names: listNames.filter((r) => r.name[0] === c).slice(0, 2)
            }

            return data;
        })

        return listCostumers;
    }

    async getSearchClient(text: string) {
        const uusers = this.userRepo.find();

        const filters = (await uusers).filter(u => {
            return u.name.startsWith(text);
        })

        var listTitleName = filters.map((v) => {
            return v.name[0];
        })

        var listNames = filters.map(v => {
            return {
                id: v.id,
                name: v.name,
                email: v.email,
            };
        })

        var titleWithOutDuplicate = listTitleName.sort().filter((value, index) => {
            return listTitleName.indexOf(value)  === index;
        })

        var listCostumers = titleWithOutDuplicate.map((c) => {
            let data = {
                title: c,
                names: listNames.filter((r) => r.name[0] === c)
            }

            return data;
        })

        return listCostumers;
    }

    async deleteAllClients() {
        return await this.userRepo.clear()
    }

    async updatePersonalData(userID: string, data: UpdatePersonalDataDto) {
        const newData = await this.personalInfoRepo.create(data);
        newData.id = uuidv4();
        newData.ownerID = userID;

        return await this.personalInfoRepo.save(newData);
    }

}
