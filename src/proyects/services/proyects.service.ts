import { v4 as uuidv4 } from 'uuid';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storages3Service } from '../../storages3/storages3.service';
import { Repository } from 'typeorm';
import { Proyects } from '../entitys/proyect.entity';
import { ProyectsData } from '../entitys/proyectData.entity';
import { ProyectsTokenomic } from '../entitys/proyectTokenomic.entity';
import { allDataProyect } from '../functions/allDataProyect.model';
import { ProyectTokenomicDto } from '../dto/proyectTokenomic.dto';
import { ProyectsFeatured } from '../entitys/proyectFeatured.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProyectsService {

    constructor(
        @InjectRepository(Proyects, 'mysqlDB') private proyectRepo: Repository<Proyects>,
        @InjectRepository(ProyectsData, 'mysqlDB') private dataProyectRepo: Repository<ProyectsData>,
        @InjectRepository(ProyectsTokenomic, 'mysqlDB') private tokenomicProyectRepo: Repository<ProyectsTokenomic>,
        @InjectRepository(ProyectsFeatured, 'mysqlDB') private featuredProyectRepo: Repository<ProyectsFeatured>,
        private readonly storageService: Storages3Service,
        private jwtService: JwtService
    ) { }


    async createProyects(files: Array<Express.Multer.File>, data: any) {

        try {
            const idProyect = uuidv4()
            const filesID = `f-${idProyect}}`
            data.featured = (data.featured === "true")
            // check if the featured proyects are less than 5.
            const validateFeatured = await this.featuredProyectRepo.findAndCount();
            if (validateFeatured[1] > 5) data.featured = false;
            if (files.length <= 0 || files.length == undefined) {
                let msgVerify = { message: "Error al cargar los documentos.", description: "No se han seleccionado ficheros." }
                return msgVerify
            }
            if (files[0]) { var pic1 = await this.storageService.createPicDocument(filesID, files[0]); } else { var pic1 = "" }
            if (files[1]) { var pic2 = await this.storageService.createPicDocument(filesID, files[1]); } else { var pic2 = "" }
            if (files[2]) { var pic3 = await this.storageService.createPicDocument(filesID, files[2]); } else { var pic3 = "" }
            if (files[3]) { var pic4 = await this.storageService.createPicDocument(filesID, files[3]); } else { var pic4 = "" }
            if (files[4]) { var pic5 = await this.storageService.createPicDocument(filesID, files[4]); } else { var pic5 = "" }
            const newProyect = <Proyects><unknown>{
                id: idProyect,
                country: data.country,
                city: data.city,
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
                address_id: data.address_id,
                featured: data.featured
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
                builder_data: data.builder_data,
                zone_malls: data.zone_malls?.toString() || "",
                zone_markets: data.zone_markets?.toString() || "",
                zone_parks: data.zone_parks?.toString() || "",
                zone_subway: data.zone_subway?.toString() || ""
            }
            const newDataProyectQuery = await this.dataProyectRepo.save(newDataProyect);


            const newTokenomicProyect = <ProyectTokenomicDto><unknown>{
                id_proyect: idProyect,
                annual_rental: data.annual_rental,
                construction_interest: data.construction_interest,
                annual_expenditure: data.annual_expenditure,
                net_leasing: data.net_leasing,
                annual_net_profit: data.annual_net_profit,
                plusvalia: data.plusvalia,
                net: data.net
            }

            const newTokenomicProyectQuery = await this.tokenomicProyectRepo.save(newTokenomicProyect);
            if (data.featured) {
                const payload = {
                    id: idProyect,
                    status: true
                }
                const tokenConfig = { secret: process.env.TOKEN_FEATURED, expiresIn: '60s' }
                let token = await this.jwtService.signAsync(payload, tokenConfig)
                console.log(token)
                const proyectFeatured = <unknown>{
                    id_proyect: idProyect,
                    token: token,
                    status: true
                }
                const newFeatured = await this.featuredProyectRepo.save(proyectFeatured)
            }

            return { newProyectQuery, newDataProyectQuery, newTokenomicProyectQuery }

        } catch (e) {
            console.log(e.message)
            throw new HttpException(e, 500)
        }

    }

    async getAllProyects() {
        try {
            const allProyects = await this.proyectRepo.find()
            let fullProyects = []
            for (var proyect of allProyects) {
                const dataProyect = await this.dataProyectRepo.findBy({ id_proyect: proyect.id })
                const tokenomicProyect = await this.tokenomicProyectRepo.findBy({ id_proyect: proyect.id })
                let temp = [proyect, ...dataProyect, ...tokenomicProyect]
                let proyectFullData = allDataProyect(temp)
                fullProyects.push(proyectFullData)
            }
            return { proyects: fullProyects }
        } catch (e: any) {
            console.log(e)
            throw new HttpException(e.message, 500)
        }
    }

    async getProyectById(id: string) {
        try {
            const proyect = await this.proyectRepo.findBy({ id: id })
            const dataProyect = await this.dataProyectRepo.findBy({ id_proyect: id })
            const tokenomicProyect = await this.tokenomicProyectRepo.findBy({ id_proyect: id })
            return { proyects: proyect, data: dataProyect, tokenomic: tokenomicProyect }
        } catch (e: any) {
            console.log(e)
            throw new HttpException(e.message, 500)
        }
    }

    async proyectByCity() {
        try {
            const allCitys = await this.proyectRepo.find({ select: { city: true } })
            let citys = []
            let arrayDataByCity = []
            for (var city of allCitys) {
                citys.push(city.city)
            }
            var arrayCitys = citys.filter((item, index) => {
                return citys.indexOf(item) === index;
            })

            for (const city of arrayCitys) {
                const dataByCity = await this.proyectRepo.find({ where: { city: city } })
                arrayDataByCity.push(dataByCity)
            }

            for (const data of arrayDataByCity) {
                console.log(data)
            }
            return { proyects: "listCitys" }
        } catch (e: any) {
            console.log(e)
            throw new HttpException(e.message, 500)
        }
    }


    async validateFeaturedTime() {
        try {
            const proyectsFeatured = await this.featuredProyectRepo.find()
            for (const proyect of proyectsFeatured) {
                console.log(proyect)
                const tokenConfig = { secret: process.env.TOKEN_FEATURED, expiresIn: '60s' }
                try {
                    await this.jwtService.verifyAsync(proyect.token, tokenConfig)
                } catch (e) {
                    await this.featuredProyectRepo.delete({ id_proyect: proyect.id_proyect })
                    await this.proyectRepo.update({ id: proyect.id_proyect }, { featured: false });
                }
            }

            return { message: "Proyect featured reviewed" }
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, 500)
        }
    }
}
