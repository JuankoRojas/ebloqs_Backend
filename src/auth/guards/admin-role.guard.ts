import { Reflector } from '@nestjs/core';
import { BadGatewayException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role.decorator';

@Injectable()
export class AdminRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRole: string = this.reflector.get(META_ROLES, context.getHandler());
    if(!validRole) return true;
    if (validRole.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const admin = req.user
    if (!admin)
      throw new BadGatewayException('User not found.')

    if (validRole.includes(admin.rol)) {
      return true;
    }

    throw new ForbiddenException(`User ${admin.user_name} need a valid role: ${validRole}`)
  }
}
