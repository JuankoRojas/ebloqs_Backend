import { v4 as uuidv4 } from 'uuid';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storages3Service } from '../../storages3/storages3.service';
import { Repository } from 'typeorm';
import { Proyects } from '../entitys/proyect.entity';
import { ProyectsData } from '../entitys/proyectData.entity';

@Injectable()
export class ProyectsService {

    constructor(
        @InjectRepository(Proyects, 'mysqlDB') private proyectRepo: Repository<Proyects>,
        @InjectRepository(ProyectsData, 'mysqlDB') private dataProyectRepo: Repository<ProyectsData>,
        private readonly storageService: Storages3Service,
    ) { }


    async createProyects(files: Array<Express.Multer.File>, data: any) {

        try {
            if (files.length <= 0 || files.length == undefined) {
                let msgVerify = { message: "Error al cargar los documentos.", description: "No se han seleccionado ficheros." }
                return msgVerify
            }
            const idProyect = uuidv4()
            const filesID = `f-${idProyect}}`

            if (files[0]) { var pic1 = await this.storageService.createPicDocument(filesID, files[0]); } else { var pic1 = "" }
            if (files[1]) { var pic2 = await this.storageService.createPicDocument(filesID, files[1]); } else { var pic2 = "" }
            if (files[2]) { var pic3 = await this.storageService.createPicDocument(filesID, files[2]); } else { var pic3 = "" }
            if (files[3]) { var pic4 = await this.storageService.createPicDocument(filesID, files[3]); } else { var pic4 = "" }
            if (files[4]) { var pic5 = await this.storageService.createPicDocument(filesID, files[4]); } else { var pic5 = "" }


            const newProyect = <Proyects><unknown>{
                id: idProyect,
                country: data.country,
                type: data.type,
                name: data.name,
                token_price: data.token_price,
                address: data.address,
                tokens_emitted: data.tokens_emitted,
                building_price: data.building_price,
                tokens_available: data.tokens_available,
                pic_1: pic1,
                pic_2: pic2,
                pic_3: pic3,
                pic_4: pic4,
                pic_5: pic5,
            };
            const newProyectQuery = await this.proyectRepo.save(newProyect);

            const newDataProyect = <ProyectsData><unknown>{
                id_proyect: idProyect,
                surface_building: data.surface_building,
                number_departaments: data.number_departaments,
                number_amenities: data.number_amenities,
                escrow: data.escrow,
                approved_plans: data.approved_plans,
                construction_license: data.construction_license,
                builder_data: data.builder_data
            }
            const newDataProyectQuery = await this.dataProyectRepo.save(newDataProyect);

            return { newProyectQuery, newDataProyectQuery }

        } catch (e) {
            throw new HttpException(e, 500)
        }

    }

    async getAllProyects() {
        try {
            const allProyects = await this.proyectRepo.find()
            return { proyects: allProyects }
        } catch (e: any) {
            console.log(e)
            throw new HttpException(e.message, 500)
        }
    }

    async getProyectById(id: string) {
        try {
            const proyect = await this.proyectRepo.findBy({ id: id })
            const dataProyect = await this.dataProyectRepo.findBy({ id_proyect: id })
            return { proyects: proyect, data: dataProyect }
        } catch (e: any) {
            console.log(e)
            throw new HttpException(e.message, 500)
        }
    }

}
