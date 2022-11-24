import { HttpException, Injectable } from '@nestjs/common';
import { Tokens } from '../entitys/tokens.entity';
import { TokensRepository } from '../repository/transactions.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTokenDto } from '../dto/createToken';

@Injectable()
export class TokensService {

    constructor(
        @InjectRepository(Tokens, 'mysqlDB') private tokensRepository: TokensRepository,
    ) { }

    async update(createToken: CreateTokenDto) {
        try {
            const token = <Tokens>{
                id: process.env.TOKEN_ID,
                ebl_balance: createToken.ebl_balance,
                dollar_balance: createToken.dollar_balance,
                private_round: createToken.private_round,
                ico_cost: createToken.ico_cost,
                presale: createToken.presale,
                presale_status: createToken.presale_status
            };
            const newToken = await this.tokensRepository.save(token);
            return newToken;

        } catch (e) {
            throw new HttpException(e, 500)
        }
    }

    async getToken() {
        try {
            const data_token = await this.tokensRepository.findOneBy({ id: process.env.TOKEN_ID });

            return data_token;

        } catch (e: any) {
            throw new HttpException(e.message, 500)
        }
    }
}
