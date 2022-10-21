import { Body, Controller, Get, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminRoleGuard } from '../../auth/guards/admin-role.guard';
import { GetAdmin } from '../../auth/decorators/get-admin.decorator';
import { JwtAdminsAuthGuard } from '../../auth/jwt.admin.auth.guard';
import { AdminEnt } from '../entities/admin.entity';
import { AdminsService } from '../services/admins.service';
import { RolesProtected } from '../../auth/decorators/role.decorator';
import { Role } from '../../auth/models/roles.model';

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

    @UseGuards(JwtAdminsAuthGuard)
    @Get('private')
    privateRoute(@GetAdmin() admin: AdminEnt) {
        return {
            ok: true,
            admin

        }
    }
    @Post('/status')
    disableAdmin(@Body() payload) {
        return this.adminService.statusAccountAdmin(payload.id)
    }

    @Post('/update')
    updateAdmin(@Body() payload: AdminEnt) {    
        return this.adminService.updateAdmin(payload)
    }

    @Post('/delete')
    deletedAdmin(@Body() payload) {
        return this.adminService.deleteAdmin(payload.id)
    }

    @Get('private2')
    @RolesProtected(Role.PRO, Role.ADMIN)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
    privateRoute2(@GetAdmin() admin: AdminEnt) {
        return {
            ok: true,
            admin

        }
    }
}
