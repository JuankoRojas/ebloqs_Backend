import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdatePersonalDataDto {

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly lastname: string;

    @IsString()
    @ApiProperty()
    readonly birthdayDate: string;

    @IsString()
    @ApiProperty()
    readonly nationality: string;

    @IsString()
    @ApiProperty()
    readonly phoneNumber: string;

    @IsString()
    @ApiProperty()
    readonly dniNumber: string;
}
