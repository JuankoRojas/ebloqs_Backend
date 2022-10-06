import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RecoveryUserDto } from './dto/recovery.dto';
import { UserEnt } from './entities/user.entity';

import { EmailsService } from '../emails/emails.service';
import { PersonalInfo } from './entities/personal_info.entity';
import { UpdatePersonalDataDto } from './dto/personal_data.dto';
import { UserEntRepository } from './repository/user.repository';
import { PersonalInfoRepository } from './repository/personalinfo.repository';
import { WalletService } from '../wallet/service/wallet.service';
import { Wallet } from '../wallet/entitys/wallet.entity';
import { Address } from './entities/address.entity';
import { BlockchainService } from '../wallet/service/blockchain.service';
import { Documents } from './entities/document.entity';
import { UserModel } from 'src/models/users/user.model';
import { CostExplorer } from 'aws-sdk';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEnt, 'mysqlDB') private userRepo: UserEntRepository,
        @InjectRepository(PersonalInfo, 'mysqlDB') private personalInfoRepo: PersonalInfoRepository,
        @InjectRepository(Wallet, 'mysqlDB') private walletRepo: Repository<Wallet>,
        @InjectRepository(Address, 'mysqlDB') private addressRepo: Repository<Address>,
        @InjectRepository(Documents, 'mysqlDB') private documentRepo: Repository<Documents>,
        private emailService: EmailsService,
        private readonly blockchainService: BlockchainService,

    ) { }

    async create(createUserDto: CreateUserDto) {
        try {
            const user = <UserEnt>{
                id: uuidv4(),
                email: createUserDto.email.toLowerCase(),
                deviceID: createUserDto.deviceID,
                typeAccount: `${createUserDto.type_account}`,
                name: `${createUserDto.name.toLowerCase()}`,
                password: "",
                idRef: randomCode(),
                emailVerificated: false,
                create: new Date(),
                update: new Date(),
            };

            const newUser = await this.userRepo.save(user);
            const linkCode = this.generatelinkvalidate(newUser.id);
            console.log(linkCode);
            /* if (newUser.typeAccount == 'email') {
                await this.emailService.sendVerificationEmails(newUser.email, linkCode);
            } */
            return newUser;

        } catch (e) {
            throw new HttpException(e, 500)
        }
    }

    findByEmail(email: string) {
        return this.userRepo.findOneBy({ email: email });
    }
    async findOneUserFromVerify(id: string) {
        return this.userRepo.findOneBy({ id: id })
    }

    async findOneUser(id: string) {
        try {
            const primaryData = await this.userRepo.findOneBy({ id: id })
            const personalData = await this.personalInfoRepo.findOneBy({ ownerID: id })
            const addressData = await this.addressRepo.findOneBy({ ownerID: id })

            let meData = <UserModel>{
                id: primaryData.id,
                name: personalData.name,
                lastName: personalData.lastname,
                email: primaryData.email,
                birthdayDate: personalData.birthdayDate,
                typeAccount: primaryData.typeAccount,
                deviceID: primaryData.deviceID,
                emailVerificated: primaryData.emailVerificated,
                password: primaryData.password,
                idRef: primaryData.idRef,
                status: primaryData.status,
                verify: primaryData?.verify || "",
                create: primaryData.create,
                update: primaryData.update,
                nationality: personalData?.nationality || "",
                phone: personalData.phoneNumber,
                DniNumber: personalData.dniNumber,
                zipCode: addressData?.postalCode || "",
                city: addressData?.city || "",
                address: addressData?.address1 || "",
                avatar: ""
            }

            return meData;

        } catch (e: any) {
            throw new HttpException(e.message, 500)
        }

    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user ${updateUserDto}`;
    }

    updateUserData(user: UserEnt) {
        const newUser = this.userRepo.create(user);
        return this.userRepo.save(newUser);
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }

    generatelinkvalidate(id: string) {
        return `http://localhost:4200/welcome/${id}`;
    }

    async validateEmailUser(code: string) {
        let vuser = await this.findOneUserFromVerify(code);
        console.log(vuser)
        if (vuser.emailVerificated) {
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
        if (user) {
            findUser.password = await bcrypt.hash(user.password, 10);
            await this.userRepo.save(findUser);
            return {
                message: 'password changed'
            }
        } else {
            throw new HttpException('user not found', 302);
        }

    }

    async getAllUsers() {
        var listClients = await this.userRepo.findBy({})

        var listNames = listClients.map(v => {
            return {
                id: v.id,
                name: v.name,
                email: v.email,
            };
        })

        return listNames;
    }

    async getSearchClient(text: string) {
        console.log(text)
        const uusers = await this.personalInfoRepo.find();
        const filters = (uusers).filter(u => {
            return u.lastname.toLocaleLowerCase().startsWith(text.toLocaleLowerCase());
        })
        console.log(filters)

        var listTitleName = filters.map((v) => {
            return v.lastname[0];
        })

        var listNames = filters.map(v => {
            return {
                id: v.id,
                name: v.name,
                lastname: v.lastname,
                ownerID: v.ownerID,
                birthdayDate: v.birthdayDate,
                nationality: v.nationality,
                phoneNumber: v.phoneNumber,
                dniNumber: v.dniNumber,
            };
        })

        var titleWithOutDuplicate = listTitleName.sort().filter((value, index) => {
            return listTitleName.indexOf(value) === index;
        })

        var listCostumers = titleWithOutDuplicate.map((c) => {
            let data = {
                title: c,
                names: listNames.filter((r) => r.lastname[0] === c)
            }

            return data;
        })

        return listCostumers;
    }

    async deleteAllClients() {
        return await this.userRepo.clear()
    }

    async updatePersonalData(userID: string, data: UpdatePersonalDataDto) {

        let payload = {
            name: data.name.toLocaleLowerCase(),
            lastname: data.lastname.toLocaleLowerCase(),
            birthdayDate: data.birthdayDate,
            nationality: data.nationality.toLocaleLowerCase(),
            phoneNumber: data.phoneNumber,
            dniNumber: data.dniNumber
        }

        const verify = await this.personalInfoRepo.findOneBy({ ownerID: userID });

        if (verify) {
            const newData = await this.personalInfoRepo.update({ ownerID: userID }, payload);
            return { message: "user Updated", payload }
        } else {
            const newData = this.personalInfoRepo.create(payload);
            newData.id = uuidv4();
            newData.ownerID = userID;

            return await this.personalInfoRepo.save(newData);
        }



    }

    async getAllPersonalData() {
        var listClients = await this.personalInfoRepo.findBy({})


        var listUsers = listClients.map(v => {
            return {
                id: v.id,
                name: v.name,
                lastname: v.lastname,
                ownerID: v.ownerID,
                birthdayDate: v.birthdayDate,
                nationality: v.nationality,
                phoneNumber: v.phoneNumber,
                dniNumber: v.dniNumber,
            };
        })

        return listUsers;
    }

    async getUserSearchLastname(text: string) {
        const uusers = this.personalInfoRepo.find();

        const filters = (await uusers).filter(u => {
            return u.lastname.startsWith(text);
        })

        var listLastnames = filters.map((v) => {
            return v.lastname[0];
        })

        var listUsers = filters.map(v => {
            return {
                id: v.id,
                name: v.name,
                lastname: v.lastname,
                ownerID: v.ownerID,
                birthdayDate: v.birthdayDate,
                nationality: v.nationality,
                phoneNumber: v.phoneNumber,
                dniNumber: v.dniNumber,
            };
        })
        var titleWithOutDuplicate = listLastnames.sort().filter((value, index) => {
            return listLastnames.indexOf(value) === index;
        })

        var listCostumers = titleWithOutDuplicate.map((c) => {
            let data = {
                title: c,
                lastname: listUsers.filter((r) => r.lastname[0] === c)
            }

            return data;
        })

        return listCostumers
    }

    async getOrderLastname() {
        var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        var orderLastnames = []

        for (const letter of letters) {
            const uusers = this.personalInfoRepo.find();
            const filters = (await uusers).filter(u => {
                return u.lastname.toLowerCase().startsWith(letter.toLowerCase());
            })
            var listLastnames = filters.map((v) => {
                return v.lastname[0];
            })

            var listUsers = filters.map(v => {
                return {
                    id: v.id,
                    name: v.name,
                    lastname: v.lastname,
                    ownerID: v.ownerID,
                    birthdayDate: v.birthdayDate,
                    nationality: v.nationality,
                    phoneNumber: v.phoneNumber,
                    dniNumber: v.dniNumber,
                };
            })
            var titleWithOutDuplicate = listLastnames.sort().filter((value, index) => {
                return listLastnames.indexOf(value) === index;
            })

            var listCostumers = titleWithOutDuplicate.map((c) => {
                let data = {
                    title: c,
                    lastnames: listUsers.filter((r) => r.lastname[0].toLowerCase() === c.toLowerCase())
                }
                return data;
            })
            if (listCostumers[0] != undefined && listCostumers.length > 0) {
                orderLastnames.push(listCostumers[0]);

            } else { null }

        }

        return orderLastnames;
    }


    async dataOfUser(id: string) {
        try {
            const personalData = await this.personalInfoRepo.findOneBy({ ownerID: id });
            const primaryData = await this.userRepo.findBy({ id: id })
            const walletData = await this.walletRepo.findOne({ where: { ownerId: id } });
            const addressData = await this.addressRepo.findOne({ where: { ownerID: id } })
            const documentData = await this.documentRepo.find({ where: { ownerID: id } });
            let key = walletData.public_key
            const balanceData = await this.blockchainService.getBalanceOf(key)
            let fullData = { personalData, primaryData, walletData, addressData, balanceData, documentData }
            if (personalData) return fullData; else return { message: `User with id : ${id} not found.` }
        } catch (e: any) {
            return e.message
        }

    }

    async setStatus(id: string, status: boolean) {
        try {
            if (status == true) {
                const newData = await this.userRepo.update({ id: id }, { status: status });
                return { status: status, message: `Usuario : ${id} activo.` }
            } else {
                const newData = await this.userRepo.update({ id: id }, { status: status });
                return { status: status, message: `Usuario : ${id} inactivo.` }
            }


        } catch (e: any) {

        }
    }

}

function randomCode() {
    var characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

    let A1 = randomTwoCharacters(characters);
    let A2 = randomTwoCharacters(numbers)
    let B1 = randomTwoCharacters(characters);
    let B2 = randomTwoCharacters(numbers)
    let refCode = `${B1}${A2}${A1}${B2}`
    return refCode
}

function randomTwoCharacters(array) {
    var idvalue = '';
    var n = 2;

    if (array.length > 10) {
        for (var i = 0; i < n; i++) {
            idvalue += array[Math.floor(Math.random() * 26)];
        }
        return idvalue;
    } else {
        for (var i = 0; i < n; i++) {
            idvalue += array[Math.floor(Math.random() * 10)];
        }
        return idvalue.toString()
    }
}

