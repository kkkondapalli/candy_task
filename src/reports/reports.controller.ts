import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import { ApiResponse } from '../http/api.response';
import { OrdersService } from '../orders/orders.service';
@Controller('reports')
@ApiTags('Reports Api')
export class ReportsController {
  constructor(private readonly orderService: OrdersService) {}

  @Get()
  async findAll(@Query('date') period: string, @Res() res: ApiResponse) {
    const defaultDate = dayjs(period).format('YYYY-MM-DD');

    const reports = await this.orderService.reports(defaultDate);

    return res.success({
      message: Object.keys(reports).length
        ? 'Reports fetched successfully'
        : 'No reports found',
      data: Object.values(reports),
    });
  }
}
