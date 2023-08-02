import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Inventory {
  @IsNumber() @IsNotEmpty() @PrimaryGeneratedColumn() id: number;

  @IsString()
  @Column({
    unique: true,
    nullable: false,
    type: 'varchar',
  })
  name: string;

  @CreateDateColumn({
    nullable: false,
    update: true,
  })
  manufacture_date: Date;

  @IsNotEmpty() @Column() @IsNumber() quantity: number;

  @CreateDateColumn({ name: 'created_at', update: false })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  // relations
  @OneToMany(() => Order, (order) => order.inventory)
  orders?: Order[];
}
