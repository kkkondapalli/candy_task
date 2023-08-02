import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import QueryHelper, { QueryFilter } from '../db/query.filter';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private readonly repository: Repository<Inventory>,
  ) {}

  create(dto: CreateInventoryDto) {
    return this.repository.save(dto);
  }

  findAll(query: QueryFilter) {
    const queryHelper = QueryHelper.filter(query);
    return this.repository.findAndCount({
      order: { [queryHelper.sort_by]: queryHelper.sort_direction },
      take: queryHelper.take,
      skip: queryHelper.skip,
    });
  }

  async findOne(id: number) {
    return this.repository.findOneByOrFail({ id: id });
  }

  async update(id: number, dto: UpdateInventoryDto) {
    await this.repository.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.softDelete({ id });
  }

  async reduceQuantity(id: number, amount: number) {
    await this.repository.decrement({ id }, 'quantity', amount);
  }

  async addQuantity(id: number, amount: number) {
    await this.repository.increment({ id }, 'quantity', amount);
  }

  async canOrder(id: number, amount: number) {
    const inventory = await this.findOne(id);

    if (inventory.quantity < amount) {
      throw new HttpException('Not enough inventory to place the order', 400);
    }
  }
}
