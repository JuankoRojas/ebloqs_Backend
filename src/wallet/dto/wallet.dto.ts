import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateWalletDto {
    @IsString()
    @ApiProperty({ description:'password of wallet' })
    readonly password: string;
}
