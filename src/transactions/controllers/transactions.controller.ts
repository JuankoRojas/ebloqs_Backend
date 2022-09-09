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

import { Request } from 'express';
import { AnyFilesInterceptor, FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CreateTrasactionDto } from '../dto/createTransaction.dto';
import { TransactionsService } from '../services/transactions.service';


@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
    constructor( private readonly transactionsService: TransactionsService,
    ) {  }
    @Post('/new')
    create(@Body() createTransactionDto: CreateTrasactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

}
