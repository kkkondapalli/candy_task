import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new HttpException('No account found', 400);
    }

    if (!compareSync(password, user.password)) {
      throw new HttpException('Invalid credentials', 400);
    }

    return user;
  }

  user(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
