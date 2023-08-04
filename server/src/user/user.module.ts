import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Class from 'src/model/class.entity';
import { User } from 'src/model/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Class]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
