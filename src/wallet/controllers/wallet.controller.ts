import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateWalletDto } from '../dto/wallet.dto';
import { WalletService } from '../service/wallet.service';

import { Request } from 'express';
import { BlockchainService } from '../service/blockchain.service';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createUserWallet(@Body() wallet: CreateWalletDto, @Req() req: Request) {
      return this.walletService.createWallet(req['user']['userId'], wallet);
  }
}
