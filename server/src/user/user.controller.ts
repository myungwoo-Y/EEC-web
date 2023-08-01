import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { User } from "src/model/user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:email')
  public async findByEmail(@Param('email') email: string): Promise<Partial<User>> {
    const result = await this.userService.findOne({email});
    if (!result) {
      return null;
    }

    return result;
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return await this.userService.createUser(user);
  }
  
  @Put('/:userId')
  async update(@Param('userId') userId: number, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(userId, user);
  }

  @Put()
  async updateUsers(@Body() users: UpdateUserDto[]) {
    return await this.userService.updateUsers(users);
  }

  @Get()
  async findAll(@Query('isActive') isActive: boolean) {
    return await this.userService.findAll({ isActive });
  }
}