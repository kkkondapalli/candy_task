import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export default class VerifyDto {
  @IsEmail() @IsNotEmpty() email: string;

  @Length(4, 4) @IsNotEmpty() verification_code: string;
}
