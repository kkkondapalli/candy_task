import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import QueryHelper, { QueryFilter } from '../db/query.filter';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repository: Repository<Order>,
  ) {}

  private get relations() {
    return {
      customer: true,
      store: true,
      inventory: true,
    };
  }

  create(dto: CreateOrderDto) {
    return this.repository.save(dto);
  }

  findAll(query: QueryFilter) {
    const queryHelper = QueryHelper.filter(query);
    return this.repository.findAndCount({
      order: { [queryHelper.sort_by]: queryHelper.sort_direction },
      take: queryHelper.take,
      skip: queryHelper.skip,
      relations: this.relations,
    });
  }

  findOne(id: number) {
    return this.repository.findOneOrFail({
      where: { id },
      relations: this.relations,
    });
  }

  async update(id: number, dto: UpdateOrderDto) {
    await this.repository.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.softDelete({ id });
  }

  async reports(date: string) {
    const orders = await this.repository.find({
      where: {
        created_at: Raw((alias) => `${alias} > :date`, { date }),
      },
      relations: this.relations,
    });

    return orders.reduce((acc, order) => {
      const storeName = order.store.name;
      const ordersForStoreAndStatus = acc[storeName] || {
        date: date,
        store: {
          id: order.store.id,
          name: order.store.name,
        },
        orders: {
          [OrderStatus.CANCELLED]: [],
          [OrderStatus.COMPLETED]: [],
          [OrderStatus.REJECTED]: [],
          [OrderStatus.PENDING]: [],
        },
      };
      ordersForStoreAndStatus.orders[order.order_status].push({
        id: order.id,
        order_status: order.order_status,
        quantity: order.quantity,
        customer: {
          id: order.customer.id,
          name: order.customer.name,
          email: order.customer.email,
        },
        inventory: { id: order.inventory.id, name: order.inventory.name },
      });
      acc[storeName] = ordersForStoreAndStatus;
      return acc;
    }, {});
  }

  async canUpdate(id: number) {
    const order = await this.findOne(id);
    switch (order.order_status) {
      case OrderStatus.REJECTED:
      case OrderStatus.COMPLETED:
      case OrderStatus.CANCELLED:
        throw new BadRequestException(
          'You cannot update the order as this is already : ' +
            order.order_status,
        );
    }
  }
}
