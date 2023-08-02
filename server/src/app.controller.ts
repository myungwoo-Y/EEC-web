import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/strategies/jwt-auth.guard';
import { LocalAuthGuard } from './auth/strategies/local-auth.guard';
import { UserService } from './user/user.service';

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
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  async getUesrByToken(@Request() req) {
    return this.userService.findOne({
      email: req.user?.email
    });
  }
}
