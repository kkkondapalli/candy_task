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
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
@ApiTags('Inventory api docs')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post()
  async create(
    @Body() payload: CreateInventoryDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const inventory = await this.inventoryService.create(payload);
    return res.success({
      message: 'Inventory added successfully',
      data: inventory,
    });
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const records = await this.inventoryService.findAll(query);
    return res.pagination(
      records[0],
      records[1],
      query,
      'All inventories list pulled successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Inventory details fetched successfully',
      data: await this.inventoryService.findOne(+id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Inventory details fetched successfully',
      data: await this.inventoryService.update(+id, updateInventoryDto),
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    await this.inventoryService.remove(+id);
    return res.success({
      message: 'Inventory removed successfully',
    });
  }
}
