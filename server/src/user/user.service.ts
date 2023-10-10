import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { removeEmpty } from 'src/lib/object';
import { Application } from 'src/model/application.entity';
import Class from 'src/model/class.entity';
import { User, UserRole } from 'src/model/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateUserDto, UpdateClassToUserDto, UpdateUserDto } from './user.dto';
import { getNow } from 'src/lib/date';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  updateLastLoginDate(userId: number) {
    this.usersRepository.update(userId, {
      lastLogin: getNow()
    });
  }

  findAll(params: Partial<User>): Promise<User[]> {
    const option = removeEmpty(params) as Partial<User>;
    return this.usersRepository.findBy(option);
  }

  async findAllResults(): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: {
        role: UserRole.STUDENT,
      },
      relations: {
        reports: true,
        applications: true,
      },
      order: {
        reports: {
          createDateTime: 'DESC',
        },
        applications: {
          createDateTime: 'ASC',
        },
      },
    });
    return users;
  }

  findOne(option: { userId?: number; email?: string }): Promise<User | null> {
    return this.usersRepository.findOne({
      where: option,
      relations: {
        applications: {
          class: true,
        },
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<InsertResult | null> {
    return this.usersRepository.insert({
      ...user,
      isActive: false,
    });
  }

  async updateUser(userId: number, user: UpdateUserDto) {
    return this.usersRepository.update(userId, {
      ...user,
    });
  }

  async updateUsers(users: UpdateUserDto[]) {
    await Promise.all(
      users.map((user) => {
        return this.usersRepository.update(user.userId, {
          ...user,
        });
      }),
    );
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateApplication({ userId, classId }: UpdateClassToUserDto) {
    const user = await this.usersRepository.findOneBy({ userId });
    const classEntity = await this.classRepository.findOneBy({ classId });
    if (!user) {
      return null;
    }

    const application = await this.applicationRepository.findOneBy({
      user: { userId },
      class: { classId },
    });

    if (application) {
      return false;
    }

    await this.applicationRepository.insert({
      user,
      class: classEntity,
      isActive: false,
    });
    return true;
  }
}
