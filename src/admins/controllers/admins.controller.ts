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
    @RolesProtected(Role.PRO, Role.ADMIN, Role.READ)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
    getUsers() {
        return this.adminService.getAll()
    }

    @Post("/rol")
    @RolesProtected(Role.PRO, Role.ADMIN)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
    setRol(@Body() payload) {
        return this.adminService.setRol(payload.id, payload.rol);
    }

    @UseGuards(JwtAdminsAuthGuard)
    @Get('private')
    @RolesProtected(Role.PRO, Role.ADMIN, Role.READ)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
    privateRoute(@GetAdmin() admin: AdminEnt) {
        return {
            ok: true,
            admin

        }
    }
    @Post('/status')
    @RolesProtected(Role.PRO, Role.ADMIN)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
    disableAdmin(@Body() payload) {
        return this.adminService.statusAccountAdmin(payload.id)
    }

    @Post('/update')
    @RolesProtected(Role.PRO, Role.ADMIN)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
    updateAdmin(@Body() payload: AdminEnt) {    
        return this.adminService.updateAdmin(payload)
    }

    @Post('/delete')
    @RolesProtected(Role.PRO, Role.ADMIN)
    @UseGuards(JwtAdminsAuthGuard, AdminRoleGuard)
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
