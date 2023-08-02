import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { RoleEnum } from '../../@types/role.type';

export class CreateUserDto {
  @Length(3, 255) @IsString() @IsNotEmpty() name: string;

  @IsEmail() @IsNotEmpty() email: string;

  @Length(8, 255) @IsString() @IsNotEmpty() password: string;

  @IsEnum(RoleEnum)
  @IsNotEmpty()
  role: string;
}
