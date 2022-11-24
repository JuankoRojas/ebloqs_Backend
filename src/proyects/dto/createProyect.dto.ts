import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateProyectDto {
    @PrimaryGeneratedColumn()
    @ApiProperty({ required: true })
    readonly id: string;

    @IsString()
    @ApiProperty()
    readonly country: string;

    @IsString()
    @ApiProperty()
    readonly city: string;

    @IsString()
    @ApiProperty()
    readonly type: string;

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly token_price: string;

    @IsString()
    @ApiProperty()
    readonly address: string;

    @IsString()
    @ApiProperty()
    readonly tokens_emitted: string;

    @IsString()
    @ApiProperty()
    readonly building_price: string;

    @IsString()
    @ApiProperty()
    readonly tokens_available: string;

    @IsString()
    @ApiProperty()
    readonly pic_1: string;

    @IsString()
    @ApiProperty()
    readonly pic_2: string;

    @IsString()
    @ApiProperty()
    readonly pic_3: string;

    @IsString()
    @ApiProperty()
    readonly pic_4: string;

    @IsString()
    @ApiProperty()
    readonly pic_5: string;

    @IsString()
    @ApiProperty()
    readonly status: number;

    @IsString()
    @ApiProperty()
    readonly address_id: string;

    @IsBoolean()
    @ApiProperty()
    readonly featured: boolean;
}
