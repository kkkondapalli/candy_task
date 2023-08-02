import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { OrdersService } from '../orders/orders.service';
import { ReportsController } from './reports.controller';

@Module({
  controllers: [ReportsController],
  providers: [OrdersService],
  imports: [TypeOrmModule.forFeature([Order])],
})
export class ReportsModule {}
