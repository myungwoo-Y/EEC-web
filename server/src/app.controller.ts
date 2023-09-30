import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategies/jwt-auth.guard';
import { LocalAuthGuard } from './auth/strategies/local-auth.guard';
import { UserService } from './user/user.service';
import { Response } from 'express';
import CookieUtil from './lib/cookie';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) response: Response) {
    const loginResponse = await this.authService.login(req.user);
    CookieUtil.setCookie('token', loginResponse.token, response, { httpOnly: true });
    return loginResponse;
  }

  @Get('auth/logout')
  async logout(@Res() response: Response) {
    CookieUtil.clearCookie('token', response);
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async getUesrByToken(
    @Request() req,
  ) {
    return this.userService.findOne({
      email: req.user?.email,
    });
  }
}
