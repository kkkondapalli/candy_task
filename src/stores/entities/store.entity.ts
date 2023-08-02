import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true, length: 255 }) name: string;
  @Column({ length: 255 })
  address: string;

  @ManyToOne(() => User, (user) => user.stores)
  manager: User;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at: Date;

  // relations
  @OneToMany(() => Order, (order) => order.store)
  orders?: Order[];
}
