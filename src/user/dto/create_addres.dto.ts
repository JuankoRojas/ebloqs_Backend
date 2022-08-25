import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAddressDto {
    @IsString()
    @ApiProperty({ type: String, required: true })
    readonly country: string;

    @IsString()
    @ApiProperty()
    readonly city: string;

    @IsString()
    @ApiProperty()
    readonly address1: string;

    @IsNumber()
    @ApiProperty()
    readonly postalCode: number;
}
