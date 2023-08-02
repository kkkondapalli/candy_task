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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('User controller endpoints')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() dto: CreateUserDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'User created successfully',
      data: await this.userService.create(dto),
    });
  }

  @Get()
  async findAll(
    @Query() query: any,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const records = await this.userService.findAll(query, query.type);
    return res.pagination(
      records[0],
      records[1],
      query,
      'User records fetched successfully',
    );
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'User details fetched successfully',
      data: await this.userService.findOne(+id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'User details updated successfully',
      data: await this.userService.update(+id, dto),
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    await this.userService.remove(+id);
    return res.success({
      message: 'User removed successfully',
    });
  }
}
