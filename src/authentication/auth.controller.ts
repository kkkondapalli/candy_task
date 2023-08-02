import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '../http/api.response';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';
import { GuestGuard } from './guard/guest.guard';
import { LoginGuard } from './guard/login.guard';

@Controller('auth')
@ApiTags('Auth controller api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(GuestGuard)
  @Post('login')
  async login(
    @Req() req: any,
    @Body() body: LoginDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'You have logged in successfully',
      data: {
        user: req.user,
        ...(await this.authService.login(req.user)),
      },
    });
  }

  @ApiBearerAuth()
  @UseGuards(LoginGuard)
  @Post('profile')
  async profile(
    @Req() req: any,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    return res.success({
      message: 'Profile details fetched',
      data: req.user,
    });
  }

  @Post('register')
  async register(
    @Body() body: RegisterDto,
    @Res() res: ApiResponse,
  ): Promise<ApiResponse> {
    const user = await this.userService.create(body);
    // @TODO: enhancement
    // Support for user verification and verifying account
    // with email service

    return res.success({
      message: 'Thanks for joining with us, Your registration is successful.',
      data: user,
    });
  }
}
