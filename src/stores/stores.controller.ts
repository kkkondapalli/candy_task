import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../http/api.response';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
@ApiTags('Store controller apis')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async create(
    @Body() dto: CreateStoreDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Store created successfully',
      data: await this.storesService.create(dto),
    });
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const records = await this.storesService.findAll(query);
    return res.pagination(
      records[0],
      records[1],
      query,
      'Store records fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Store details fetched successfully',
      data: await this.storesService.findOne(+id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStoreDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Store details updated successfully',
      data: await this.storesService.update(+id, dto),
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    await this.storesService.remove(+id);
    return res.success({
      message: 'Store removed successfully',
    });
  }
}
