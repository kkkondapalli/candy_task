import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: '0.0.0.0',
          port: 3307,
          username: 'sail',
          password: 'password',
          database: 'testing',
          entities: [User],
          synchronize: true,
        }),
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
