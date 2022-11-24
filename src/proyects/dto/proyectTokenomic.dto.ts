import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class ProyectTokenomicDto {
    @PrimaryGeneratedColumn()
    @ApiProperty({ required: true })
    readonly id: string;

    @IsString()
    @ApiProperty()
    readonly annual_rental: string;

    @IsString()
    @ApiProperty()
    readonly construction_interest: string;

    @IsString()
    @ApiProperty()
    readonly annual_expenditure: string;

    @IsString()
    @ApiProperty()
    readonly net_leasing: string;

    @IsString()
    @ApiProperty()
    readonly annual_net_profit: string;

    @IsString()
    @ApiProperty()
    readonly plusvalia: string;

    @IsString()
    @ApiProperty()
    readonly net: string;
}
