import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateDataProyectDto {
    @ApiProperty({ required: true })
    readonly id_proyect: string;

    @IsString()
    @ApiProperty()
    readonly surface_building: string;

    @IsString()
    @ApiProperty()
    readonly number_departaments: string;

    @IsString()
    @ApiProperty()
    readonly number_amenities: string;

    @IsString()
    @ApiProperty()
    readonly escrow: string;

    @IsString()
    @ApiProperty()
    readonly approved_plans: string;

    @IsString()
    @ApiProperty()
    readonly construction_license: string;

    @IsString()
    @ApiProperty({ nullable: true })
    readonly builder_data: string;

    @IsString()
    @ApiProperty({ nullable: true })
    readonly zone_malls: string;

    @IsString()
    @ApiProperty({ nullable: true })
    readonly zone_markets: string;

    @IsString()
    @ApiProperty({ nullable: true })
    readonly zone_parks: string;

    @IsString()
    @ApiProperty({ nullable: true })
    readonly zone_subway: string;

}
