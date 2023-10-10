import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/model/application.entity';
import Class from 'src/model/class.entity';
import { User } from 'src/model/user.entity';
import { ApplicationController } from './application.controller';
import { ApplicationService } from './application.service';
import { SimpleReport } from 'src/model/simpleReport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Class, Application, SimpleReport]),
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
