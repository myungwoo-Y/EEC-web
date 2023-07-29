import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { InsertResult, Repository } from "typeorm";
import { CreateUserDto } from "./user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async createUser(user: CreateUserDto): Promise<InsertResult | null> {
    return this.usersRepository.insert({
      ...user,
      isActive: false
    });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}