import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    UseInterceptors,
    UploadedFiles,
} from '@nestjs/common';
import { Request } from 'express';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { ProyectsService } from '../services/proyects.service';

@Controller('proyects')
export class ProyectsController {

    constructor(
        private readonly proyectService: ProyectsService,

    ) { }

    @UseGuards(JwtAuthGuard)
    @ApiConsumes('multipart/form-data')
    @ApiBearerAuth()
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                type: { type: 'string' },
                files: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })
    @UseInterceptors(AnyFilesInterceptor())
    @Post('/new/')
    createProyect(@Req() req: Request, @UploadedFiles() files: Array<Express.Multer.File>, @Body() payload: string) {
        return this.proyectService.createProyects(files, payload);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/')
    getAllProyects() {
        return this.proyectService.getAllProyects();
    }

    @UseGuards(JwtAuthGuard)
    @Post('/getOne/')
    getProyectById(@Body() data: any) {
        return this.proyectService.getProyectById(data.idProyect);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get/Bycity')
    getProyectByCity() {
        return this.proyectService.proyectByCity();
    }


    @UseGuards(JwtAuthGuard)
    @Get('/featured/validate')
    validatePoyectFeatures() {
        return this.proyectService.validateFeaturedTime();
    }
}
