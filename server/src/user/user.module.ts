import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/model/application.entity';
import Class from 'src/model/class.entity';
import { User } from 'src/model/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SimpleReport } from 'src/model/simpleReport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Class, Application, SimpleReport]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
