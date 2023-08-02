import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum, RoleType } from '../@types/role.type';
import { CreateCustomerDto } from '../customers/dto/create-customer.dto';
import { UpdateCustomerDto } from '../customers/dto/update-customer.dto';
import QueryHelper, { QueryFilter } from '../db/query.filter';
import Str from '../support/str';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  async create(payload: CreateUserDto | CreateCustomerDto) {
    const hashedPassword = Str.crypt(payload.password);
    const role =
      payload instanceof CreateUserDto ? payload.role : RoleEnum.CUSTOMER;

    payload = {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role,
    };

    return this.repository.save(payload);
  }

  findAll(query: QueryFilter, type: RoleType = RoleEnum.CUSTOMER) {
    const queryHelper = QueryHelper.filter(query);
    return this.repository.findAndCount({
      where: { role: type },
      order: { [queryHelper.sort_by]: queryHelper.sort_direction },
      take: queryHelper.take,
      skip: queryHelper.skip,
    });
  }

  findOne(id: number, type?: RoleEnum) {
    const where = { id };
    if (type !== null) {
      where['role'] = type;
    }
    return this.repository.findOneByOrFail(where);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto | UpdateCustomerDto,
    type?: RoleEnum,
  ) {
    if (type) {
      await this.repository.update({ id, role: type }, updateUserDto);
    } else {
      await this.repository.update({ id }, updateUserDto);
    }
    return this.findOne(id);
  }

  async remove(id: number, type?: RoleEnum) {
    await this.findOne(id, type);
    return this.repository.softDelete({ id });
  }
}
