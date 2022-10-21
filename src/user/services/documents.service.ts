import { HttpException, Injectable } from '@nestjs/common';
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
    ) { }


    async createDocument(files: Array<Express.Multer.File>, userId: string, type: string) {
        if (files.length <= 0 || files.length == undefined) {
            let msgVerify = { message: "Error al cargar los documentos.", userId: userId, description: "No se han seleccionado ficheros." }
            return msgVerify
        }
        try {
            let documents = []
            let file = files[0];

            if (file.fieldname == "front") {
                const newDocument = <Documents><unknown>{
                    id: uuidv4(),
                    type: type,
                    documentURL: await this.storageService.createFileDocument(userId, file),
                    ownerID: userId,
                    side: 'front'
                };
                const cDocument = this.docRepo.create(newDocument);
                await this.docRepo.save(cDocument);
                documents.push(cDocument);
                let res = { message: "documentos cargados", userId: userId }
                return res;
            }
            if (file.fieldname == "rever") {
                const newDocument = <Documents><unknown>{
                    id: uuidv4(),
                    type: type,
                    documentURL: await this.storageService.createFileDocument(userId, file),
                    ownerID: userId,
                    side: 'rever'
                };
                console.log(newDocument)
                const cDocument = this.docRepo.create(newDocument);
                await this.docRepo.save(cDocument);
                documents.push(cDocument);
                let res = { message: "documentos cargados", userId: userId }
                return res;
            }

        } catch (e: any) {
            console.log(e.message);
            throw new HttpException(e.mesagge, 500)
        }
    }


    async upLoadsDocuments(userId: string, files: Array<Express.Multer.File>): Promise<string[]> {
        let urlsFIles = [];
        for await (const fileUrs of files) {
            const url = await this.storageService.createFileDocument(userId, fileUrs)
            urlsFIles = [...urlsFIles, url];

            if (urlsFIles.length == files.length) {
                console.log(urlsFIles)
                return urlsFIles;
            }
        }
    }
}
