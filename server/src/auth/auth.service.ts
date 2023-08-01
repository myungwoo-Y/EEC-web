import { Dependencies, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.entity';
import { UserService } from 'src/user/user.service';

@Dependencies(UserService, JwtService)
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne({email});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
      user
    };
  }
}
