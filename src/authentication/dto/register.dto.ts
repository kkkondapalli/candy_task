import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export default class RegisterDto {
  @Length(3, 255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 255)
  @IsNotEmpty()
  password: string;

  @Length(8, 255)
  @IsNotEmpty()
  confirm_password: string;
}
