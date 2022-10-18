import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
    @IsEmail()
    @ApiProperty({ type: String, format: 'email', required: true })
    readonly email: string;

    @IsString()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @ApiProperty()
    readonly lastname: string;

    @IsString()
    @ApiProperty()
    readonly password: string;

    @IsString()
    @ApiProperty()
    readonly role: number;
}
