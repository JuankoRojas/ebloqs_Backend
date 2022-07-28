import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User, 'mysqlDB') private userRepo: Repository<User>,
    ) {}
    create(createUserDto: CreateUserDto) {
        const newUser = this.userRepo.create(createUserDto);
        newUser.id = uuidv4();
        newUser.name = 'Your name';
        newUser.photoURL = 'https://via.placeholder.com/150';
        return this.userRepo.save(newUser);
    }

    findByEmail(email: string) {
        return `This action returns all user ${email}`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user ${updateUserDto}`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
