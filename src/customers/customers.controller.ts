import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '../@types/role.type';
import { ApiResponse } from '../http/api.response';
import { UserService } from '../user/user.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginGuard } from '../authentication/guard/login.guard';

@Controller('customers')
@ApiTags('Customers api')
@ApiBearerAuth()
@UseGuards(LoginGuard)
export class CustomersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() dto: CreateCustomerDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Customer created successfully',
      data: await this.userService.create(dto),
    });
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const records = await this.userService.findAll(query, RoleEnum.CUSTOMER);
    return res.pagination(
      records[0],
      records[1],
      query,
      'Customer records fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Customer details fetched successfully',
      data: await this.userService.findOne(+id, RoleEnum.CUSTOMER),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Customer details updated successfully',
      data: await this.userService.update(+id, dto),
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    await this.userService.remove(+id, RoleEnum.CUSTOMER);
    return res.success({
      message: 'Customer removed successfully',
    });
  }
}
