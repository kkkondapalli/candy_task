import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { StoresModule } from './stores/stores.module';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { ReportsModule } from './reports/reports.module';
import ErrorResponseMiddleware from './http/middlewares/error.response.middleware';
import SuccessResponseMiddleware from './http/middlewares/success.response.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('database'));
        return {
          type: 'mysql',
          host: configService.get('database.host'),
          port: Number(configService.get('database.port')),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [],
          synchronize: configService.get('database.sync'),
          autoLoadEntities: true,
        };
      },
    }),
    InventoryModule,
    UserModule,
    AuthenticationModule,
    StoresModule,
    OrdersModule,
    CustomersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(SuccessResponseMiddleware, ErrorResponseMiddleware)
      .forRoutes('*');
  }
}
