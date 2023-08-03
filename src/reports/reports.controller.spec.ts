import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { OrdersService } from '../orders/orders.service';

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OrdersService,
          useValue: {},
        },
      ],
      controllers: [ReportsController],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
