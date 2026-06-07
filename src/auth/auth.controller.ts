import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dtos/register.user.dto';
import { UserLoginDto } from './dtos/user.login.dto';
import type { Request, Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register-user')
  registerUser(@Body() data: RegisterUserDto) {
    return this.authService.createUser(data);
    return 2;
  }
  @Post('login')
  async userLogin(
    @Body() data: UserLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // console.log(data)
    const { refreshToken, ...response } = await this.authService.login(data);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return response;
  }
  @Post('logout')
  userLogout(@Req() req: Request) {
    // console.log(data)
  }
  @Post('refresh-token')
  refreshToken(@Req() req: Request) {
    // console.log(data)
  }
}
