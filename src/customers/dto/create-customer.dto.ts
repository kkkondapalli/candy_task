import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @Length(3, 255) @IsString() @IsNotEmpty() name: string;

  @IsEmail() @IsNotEmpty() email: string;

  @Length(8, 255) @IsString() @IsNotEmpty() password: string;
}
