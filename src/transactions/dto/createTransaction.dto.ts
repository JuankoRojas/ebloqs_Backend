import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateTrasactionDto {
    @IsEmail()
    @ApiProperty({ required: true })
    readonly id: string;

    @IsString()
    @ApiProperty()
    readonly customer: string;

    @IsString()
    @ApiProperty()
    readonly receiver: string;

    @IsString()
    @ApiProperty()
    readonly amount: string;

    @IsString()
    @ApiProperty()
    readonly type: string;    

    @IsString()
    @ApiProperty()
    readonly status: number;  
}
