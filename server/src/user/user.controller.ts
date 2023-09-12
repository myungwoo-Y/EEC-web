import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { User, UserRole } from "src/model/user.entity";
import { CreateUserDto, UpdateClassToUserDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "src/auth/strategies/jwt-auth.guard";
import { HasRoles } from "src/auth/has-role.decorator";
import { RoleGuard } from "src/auth/role.guard";

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

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('class')
  async updateClass(@Body() updateClassToUserDto: UpdateClassToUserDto) {
    return await this.userService.updateApplication(updateClassToUserDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Put(':userId')
  async update(@Param('userId') userId: number, @Body() user: UpdateUserDto) {
    return await this.userService.updateUser(userId, user);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put()
  async updateUsers(@Body() users: UpdateUserDto[]) {
    return await this.userService.updateUsers(users);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll(@Query('isActive') isActive: boolean) {
    return await this.userService.findAll({ isActive });
  }
}