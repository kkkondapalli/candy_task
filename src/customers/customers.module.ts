import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CustomersController } from './customers.controller';

@Module({
  controllers: [CustomersController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class CustomersModule {}
