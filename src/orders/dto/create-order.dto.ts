import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Max,
  Min,
} from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  @Max(9999)
  @Min(1)
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  customer_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  store_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  inventory_id: number;

  @IsEnum(OrderStatus)
  order_status?: string;
}
