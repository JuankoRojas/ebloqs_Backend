import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storages3Service } from 'src/storages3/storages3.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Documents } from '../entities/document.entity';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Documents, 'mysqlDB') private docRepo: Repository<Documents>,
            private readonly storageService: Storages3Service,
        ) {}


    async createDocument(file: Express.Multer.File, userID: string, type: string) {
        const urlFile = await this.storageService.createFileDocument(file);
        const newDocument = <Documents> {
            id: uuidv4(),
            type: type,
            documentURL: urlFile,
            ownerID: userID,
        };

        const cDocument = await this.docRepo.create(newDocument);
        return await this.docRepo.save(cDocument);

    }
}
