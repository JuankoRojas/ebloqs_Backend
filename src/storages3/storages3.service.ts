import { HttpException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';


@Injectable()
export class Storages3Service {
    async createFileDocument(userId: string, file: Express.Multer.File): Promise<string> {
        try {  
            var docNameUnique = `doc-${userId}${file.originalname}`
            if (file.fieldname == "front") {
                const urlKey = `document/front/${docNameUnique}`;
                const params = {
                    Body: file.buffer,
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: urlKey,
                };
                return this.uploadFile(params);
            }
            if (file.fieldname == "rever") {
                const urlKey = `document/rever/${docNameUnique}`;
                const params = {
                    Body: file.buffer,
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: urlKey,
                };
                return this.uploadFile(params);
            }

        } catch (error) {
            throw new HttpException(`Error al crear el documento: ${error}`, 351)
        }
    }


    async uploadFile(params: any) {
        try {
            const s3 = new S3();
            const data = await s3.upload(params).promise().then(data => {
                return data;
            })
            return data.Location;
        } catch (error: any) {
            console.log(error)
            throw new HttpException(`Error al cargar el archivo: ${error}`, 350)
        }
    }
}
