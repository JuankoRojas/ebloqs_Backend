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
import { CreateTokenDto } from '../dto/createToken';
import { TokensService } from '../services/tokens.service';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';

@Controller('tokens')
export class TokensController {

    constructor(private readonly tokensService: TokensService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('/update')
    updates(@Body() createToken: CreateTokenDto) {
        return this.tokensService.update(createToken);
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get')
    getToken() {
        return this.tokensService.getToken();
    }
}
