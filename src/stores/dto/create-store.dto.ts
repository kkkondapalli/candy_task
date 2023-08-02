import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateStoreDto {
  @Length(3, 255)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  manager_id: number;

  @Length(3, 500)
  @IsNotEmpty()
  address: string;
}
