import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storages3Service } from '../../storages3/storages3.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Documents } from '../entities/document.entity';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(Documents, 'mysqlDB') private docRepo: Repository<Documents>,
            private readonly storageService: Storages3Service,
        ) {}


    async createDocument(files: Array<Express.Multer.File>, userID: string, type: string) {
        let urls = await  this.upLoadsDocuments(files);
        
        const newDocument = <Documents> <unknown>{
            id: uuidv4(),
            type: type,
            documentURL: urls,
            ownerID: userID,
        };

        const cDocument = this.docRepo.create(newDocument);
        return await this.docRepo.save(cDocument);
    }


    async upLoadsDocuments(files: Array<Express.Multer.File>): Promise<string[]> {
        let urlsFIles = [];
        for await (const fileUrs of files) {
            const url =  await this.storageService.createFileDocument(fileUrs)
            urlsFIles = [...urlsFIles, url];

            if(urlsFIles.length == files.length) {
                return urlsFIles;
            }
        }
    }
}
