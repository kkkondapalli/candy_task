import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { Store } from '../../stores/entities/store.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn() id: number;

  @ManyToOne(() => User, (user) => user.orders)
  customer: User;

  @ManyToOne(() => Inventory, (inventory) => inventory.orders)
  inventory: Inventory;

  @ManyToOne(() => Store, (store) => store.orders)
  store: Store;

  @Column()
  quantity: number;

  @Column({ default: 'pending' })
  order_status: string;

  @Column({ nullable: true, default: null })
  remarks: string;

  @CreateDateColumn({
    update: false,
  })
  created_at: Date;

  @UpdateDateColumn() updated_at: Date;
  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at: Date;
}
