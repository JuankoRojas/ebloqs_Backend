import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';

@Injectable()
export class JwtAdminsAuthGuard extends AuthGuard('admins') {
    constructor(private readonly reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const roles = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
        if (roles) {
            return true;
        }

        return super.canActivate(context);
    }
}
