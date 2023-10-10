import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Certification } from './../model/certification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CertificationController } from './certification.controller';
import { CertificationService } from './certification.service';
import { User } from 'src/model/user.entity';
import Class from 'src/model/class.entity';
import { Application } from 'src/model/application.entity';
import { Comment } from 'src/model/comment.entity';
import { SimpleReport } from 'src/model/simpleReport.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Certification, Class, Application, Comment, SimpleReport]),
    UserModule
  ],
  controllers: [CertificationController],
  providers: [CertificationService, UserService]
})
export class CertificationModule {}
