import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from '../dto/wallet.dto';
import { Wallet } from '../entitys/wallet.entity';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { BlockchainService } from './blockchain.service';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet, 'mysqlDB') private walletRepo: Repository<Wallet>,
        private readonly blockchainService: BlockchainService,
    ) {}

    async createWallet(userId: string, walletDTO: CreateWalletDto) {

        try {
            const newWallter = <Wallet> {
                id: uuidv4(),
                ownerId: userId,
                password: await bcrypt.hash(walletDTO.password, 10),
            }
    
            const refWallet = this.walletRepo.create(newWallter);
    
            const savedwallet = await this.walletRepo.save(refWallet);
    
            const mnemonicS = await this.blockchainService.getMnemonic(savedwallet.password);
    
            return {
                id_wallet: savedwallet.id,
                mnemonic: mnemonicS['data']['mnemonic'],
            };
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
