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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../http/api.response';
import { InventoryService } from '../inventory/inventory.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from './order-status.enum';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Order controller apis')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly inventoryService: InventoryService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateOrderDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    // do we have enough inventory to add the order
    await this.inventoryService.canOrder(dto.inventory_id, dto.quantity);
    const order = await this.ordersService.create(dto);
    await this.inventoryService.reduceQuantity(dto.inventory_id, dto.quantity);

    return res.success({
      message: 'Order created successfully',
      data: order,
    });
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const records = await this.ordersService.findAll(query);
    return res.pagination(
      records[0],
      records[1],
      query,
      'Order records fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Order details fetched successfully',
      data: await this.ordersService.findOne(+id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    await this.ordersService.canUpdate(+id);
    await this.inventoryService.canOrder(dto.inventory_id, dto.quantity);
    const order = await this.ordersService.update(+id, dto);

    if (
      order.order_status === OrderStatus.CANCELLED ||
      order.order_status === OrderStatus.REJECTED
    ) {
      // the order cancelled, so we can safely revert the inventory quantity
      await this.inventoryService.addQuantity(
        order.inventory.id,
        order.quantity,
      );
    }

    return res.success({
      message: 'Order details updated successfully',
      data: order,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    await this.ordersService.remove(+id);
    return res.success({
      message: 'Order removed successfully',
    });
  }
}
