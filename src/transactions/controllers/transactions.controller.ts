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
    constructor(private readonly transactionsService: TransactionsService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('/new')
    create(@Body() createTransactionDto: CreateTrasactionDto) {
        return this.transactionsService.create(createTransactionDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/getAll")
    getAllTransactions() {
        return this.transactionsService.getAllTransactions();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/status")
    updateStatus(@Body() payload: any) {
        return this.transactionsService.updateStatusTransactionsBank(payload.id, payload.status)
    }

    @UseGuards(JwtAuthGuard)
    @Post("/type")
    getByStatus(@Body() payload: any) {
        return this.transactionsService.getByType(payload.type)
    }

    @Get("/balances")
    getBalances(){
        return this.transactionsService.getBalances()
    }
}
