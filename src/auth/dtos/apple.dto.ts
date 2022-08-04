
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNotEmpty } from 'class-validator';

export class AuthAppleLoginDto {
  @ApiProperty({ description: 'code recibe from apple signin' })
  @IsNotEmpty()
  authorizationCode: string;
}