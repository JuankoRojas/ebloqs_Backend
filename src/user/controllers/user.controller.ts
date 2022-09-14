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
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { CreateUserDto } from '../dto/create-user.dto';
import { RecoveryUserDto } from '../dto/recovery.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ValidateUserDto } from '../dto/validate.dto';
import { UserService } from '../user.service';

import { Request } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from '../services/documents.service';
import { AddressService } from '../services/address.service';
import { CreateAddressDto } from '../dto/create_addres.dto';
import { UpdatePersonalDataDto } from '../dto/personal_data.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly docService: DocumentsService,
        private readonly addresService: AddressService,
    ) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    // 3- obtener mi informacion (usuario)
    @UseGuards(JwtAuthGuard)
    @Post('/me')
    meInfo(@Req() req: Request) {
        return this.userService.findOneUser(req['user']['userId']);
    }


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
    // 4- carga de imagen documento de identidad. (falta apartar por lados)
    @UseInterceptors(AnyFilesInterceptor())
    @Post('/documents')
    createDocument(@Req() req: Request, @UploadedFiles() files: Array<Express.Multer.File>, @Body() type: string) {
        return this.docService.createDocument(files, req['user']['userId'], type['type']);
    }

    // 5- guardar una direccion de un usuario.
    @UseGuards(JwtAuthGuard)
    @Post('/address')
    createAddress(@Req() req: Request, @Body() addres: CreateAddressDto) {
        return this.addresService.createAddresFromUser(req['user']['userId'], addres);
    }
    // 6- actualizar datos personales.
    @UseGuards(JwtAuthGuard)
    @Post('/personalData')
    createPersonalData(@Req() req: Request, @Body() data: UpdatePersonalDataDto) {
        return this.userService.updatePersonalData(req['user']['userId'], data);
    }

    // validar usuario por correo.
    @Post('validate')
    findAll(@Body() code: ValidateUserDto) {
        return this.userService.validateEmailUser(code.code);
    }

    @Post('recovery')
    recoveryUser(@Body() code: RecoveryUserDto) {
        return this.userService.recoveryUser(code);
    }

    @Get('all')
    findOne(@Param('id') id: string) {
        return this.userService.getAllUsers();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete('allclients')
    remove() {
        return this.userService.deleteAllClients();
    }

    @Get('/allUserData')
    getAllPersonalData() {
        return this.userService.getAllPersonalData();
    }

    @Post('/searchLastname/:search')
    getUserSearchLastname(@Param('search') search: string) {
        return this.userService.getUserSearchLastname(search);
    }

    @Get('/getOrderLastname')
    async getOrderLastname() {
        return this.userService.getOrderLastname();
    }

    @Get('dataOfUser/:uid')
     dataOfUser(@Param('uid') uid: string) {
        return this.userService.dataOfUser(uid);
    }

    @Post('/newTokens')
    newTokens(@Body() data) {
        return data
    }
}
