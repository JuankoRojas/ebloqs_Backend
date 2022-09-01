import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class RecoveryUserDto {
    @IsString()
    @ApiProperty({ description:'verificate code' })
    readonly email: string;
    
    @IsString()
    @ApiProperty({ description:'verificate code' })
    readonly password: string;
}
