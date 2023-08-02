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
import { Store } from '../../stores/entities/store.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;

  @Column({ unique: true }) email: string;

  @Column() password: string;

  @Column({ default: 'customer' }) role: string;

  @CreateDateColumn({
    nullable: true,
  })
  verified_at: Date;

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
  @OneToMany(() => Store, (store) => store.manager) stores?: Store[];

  @OneToMany(() => Order, (order) => order.customer) orders?: Order[];
}
