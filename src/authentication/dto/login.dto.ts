import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export default class LoginDto {
  @ApiProperty({
    example: 'hello@example.com',
    description: 'Email address of the user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'Password',
  })
  @Length(8, 255)
  @IsNotEmpty()
  password: string;
}
