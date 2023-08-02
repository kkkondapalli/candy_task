import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../inventory/entities/inventory.entity';
import { InventoryService } from '../inventory/inventory.service';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, InventoryService],
  imports: [TypeOrmModule.forFeature([Order, Inventory])],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
