import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common"

export const GetAdmin = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if (!user)
            throw new InternalServerErrorException('User not found (Request)');

        return (!data) ? user : user[data];
    }
);