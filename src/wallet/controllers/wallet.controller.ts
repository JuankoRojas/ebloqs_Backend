import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { CreateWalletDto } from '../dto/wallet.dto';
import { WalletService } from '../service/wallet.service';

import { Request } from 'express';
import { BlockchainService } from '../service/blockchain.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService
  ) { }
  // crear una wallet.
  @UseGuards(JwtAuthGuard)
  @Post()
  createUserWallet(@Body() wallet: CreateWalletDto, @Req() req: Request) {
    return this.walletService.createWallet(req['user']['userId'], wallet);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/balance')
  getWalletBalance(@Req() req: Request) {
    console.log(req['user'])
    return this.walletService.getWalletBalance(req['user']['userId']);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/approve')
  getApprove(@Req() req: Request, @Body() data) {
    return this.walletService.getApprove(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/transfer')
  getTransfer(@Req() req: Request, @Body() data) {
    return this.walletService.getTransfer(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/totalSupply')
  getTotalSupply() {
    return this.walletService.getTotalSupply();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/balanceOf/:key')
  getBalanceOf(@Param('key') key: any) {
  
    
    return this.walletService.getBalanceOf(key);
  }
}
