import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BlockchainService {
    constructor(
        // private configService: ConfigType<typeof config>,
        private httpService: HttpService,
    ) {}
    async getMnemonic(password: string): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .post(
                        `https://ebloqs-hub-blockchain.herokuapp.com/api/account/mnemonic?password=${password}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    )
                    .subscribe(
                        (data) => {
                            resolve(data.data);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getBalance(publicKey: string): Promise<any> {
        try {
            return new Promise((resolve, reject) => {
                this.httpService
                    .get(
                        `https://ebloqs-hub-blockchain.herokuapp.com/api/token/BalanceOf/${publicKey}`,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        },
                    )
                    .subscribe(
                        (data) => {
                            resolve(data.data);
                        },
                        (error) => {
                            reject(error);
                        },
                    );
            });
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
