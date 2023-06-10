import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/model/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./user.model";

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

  async createUser(user: CreateUserDto): Promise<User | null> {
    return this.usersRepository.create(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}