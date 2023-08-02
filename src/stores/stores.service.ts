import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import QueryHelper, { QueryFilter } from '../db/query.filter';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store) private readonly repository: Repository<Store>,
  ) {}

  create(createStoreDto: CreateStoreDto) {
    return this.repository.save(createStoreDto);
  }

  findAll(query: QueryFilter) {
    const queryHelper = QueryHelper.filter(query);
    return this.repository.findAndCount({
      order: { [queryHelper.sort_by]: queryHelper.sort_direction },
      take: queryHelper.take,
      skip: queryHelper.skip,
      relations: {
        manager: true,
      },
    });
  }

  findOne(id: number) {
    return this.repository.findOneOrFail({
      where: { id },
      relations: { manager: true },
    });
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    await this.findOne(id);
    await this.repository.update({ id }, updateStoreDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.softDelete({ id });
  }
}
