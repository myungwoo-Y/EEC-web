import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { User } from "src/model/user.entity";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  public async findOneUser(@Param('email', ParseIntPipe) email: string): Promise<User> {
    const result = await this.userService.findOne(email);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }

    return result;
  }
}