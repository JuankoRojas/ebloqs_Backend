import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: 'This is optional' })
    readonly name: string;

    @IsString()
    readonly email: string;

    @IsString()
    readonly deviceID: string;
}
