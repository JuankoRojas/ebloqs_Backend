import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ValidateUserDto {
    @IsString()
    @ApiProperty({ description:'verificate code' })
    readonly code: string;
}
