import { Controller, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
    constructor(private readonly userService: UserService) {}

    @Post('/search/:search')
    create(@Param('search') search: string) {
        return this.userService.getSearchClient(search);
    }
}
