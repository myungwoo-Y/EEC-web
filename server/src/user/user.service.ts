import { Injectable, Query} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { removeEmpty } from "src/lib/object";
import { User } from "src/model/user.entity";
import { InsertResult, Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(params: Partial<User>): Promise<User[]> {
    const option = removeEmpty(params) as Partial<User>;
    return this.usersRepository.findBy(option);
  }

  findOne(option: {
    userId?: number,
    email?: string
  }): Promise<User | null> {
    return this.usersRepository.findOneBy(option);
  }

  async createUser(user: CreateUserDto): Promise<InsertResult | null> {
    return this.usersRepository.insert({
      ...user,
      isActive: false
    });
  }

  async updateUser(userId: number, user: UpdateUserDto) {
    return this.usersRepository.update(userId, {
      ...user,
    });
  }

  async updateUsers(users: UpdateUserDto[]) {
    await Promise.all(users.map((user) => {
      return this.usersRepository.update(user.userId, {
        ...user,
      });
    }));
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}