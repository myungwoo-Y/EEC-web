import { Controller, Get, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { User } from "src/model/user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  public async read(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const result = await this.userService.findOne(id);
    if (!result) {
      throw new NotFoundException('NotFoundData');
    }

    return result;
  }
}