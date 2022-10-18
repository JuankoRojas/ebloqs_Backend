import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminsService } from '../services/admins.service';

@ApiTags('admins')
@Controller('admins')
export class AdminsController {

    constructor(private readonly adminService: AdminsService,
    ) { }


    @Get("/users")
    getBalances() {
        return this.adminService.getAll()
    }

    @Post("/rol")
    setRol(@Body() payload) {
        return this.adminService.setRol(payload.id, payload.rol);
    }
}
