import { IsDateString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateInventoryDto {
  @Length(3, 190)
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  manufacture_date: Date;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
