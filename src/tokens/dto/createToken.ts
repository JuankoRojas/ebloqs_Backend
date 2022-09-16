import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTokenDto {
    @IsString()
    @ApiProperty({ required: true })
    readonly id: string;

    @IsString()
    @ApiProperty()
    readonly ebl_balance: string;

    @IsString()
    @ApiProperty()
    readonly dollar_balance: string;

    @IsString()
    @ApiProperty()
    readonly private_round: string;

    @IsString()
    @ApiProperty()
    readonly ico_cost: string;

    @IsString()
    @ApiProperty()
    readonly presale: string;
}
