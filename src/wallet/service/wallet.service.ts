import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWalletDto } from '../dto/wallet.dto';
import { Wallet } from '../entitys/wallet.entity';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { BlockchainService } from './blockchain.service';
import { UserService } from '../../user/user.service';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet, 'mysqlDB') private walletRepo: Repository<Wallet>,
        private readonly blockchainService: BlockchainService,
        private readonly userService: UserService,
    ) { }

    async createWallet(userId: string, walletDTO: CreateWalletDto) {

        try {
            const newWallter = <Wallet>{
                id: uuidv4(),
                ownerId: userId,
                password: await bcrypt.hash(walletDTO.password, 10),
            }

            const refWallet = this.walletRepo.create(newWallter);

            const mnemonicS = await this.blockchainService.getMnemonic(refWallet.password);
            console.log(mnemonicS);
            refWallet.public_key = mnemonicS['data']['address']
            const savedwallet = await this.walletRepo.save(refWallet);


            return {
                id_wallet: savedwallet.id,
                public_key: savedwallet.public_key,
                mnemonic: mnemonicS['data']['mnemonic'],
                address: mnemonicS['data']['address']
            };

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getWalletBalance(userID: string) {
        var userData = await this.userService.findOneUser(userID);
        var walletData = await this.walletRepo.findOne({ where: { ownerId: userID } });
        var balance = await this.blockchainService.getBalance(walletData.public_key);

        return {
            balance: balance['data'],
        };
    }


    async getApprove(payload: any) {
        try {
            let data = {
                "spender": payload.spender,
                "amount": payload.amount
            }
            const approve = await this.blockchainService.getApprove(data);

            return approve

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async getTransfer(payload: any) {
        try {
            let data = {
                "to": payload.to,
                "amount": payload.amount
            }
            const approve = await this.blockchainService.getTransfer(data);

            return approve

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
    async getTotalSupply() {
        try {
            const approve = await this.blockchainService.getTotalSupply();

            return approve

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async getBalanceOf(key: string) {
        try {
            const approve = await this.blockchainService.getBalanceOf(key);

            return approve

        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
