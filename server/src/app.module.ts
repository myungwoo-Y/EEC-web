import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { User } from './model/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PostModule } from './post/post.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ClassModule } from './class/class.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { LectureModule } from './lecture/lecture.module';
import { MsgModule } from './msg/msg.module';
import { CertificationModule } from './certification/certification.module';
import Class from './model/class.entity';
import { Application } from './model/application.entity';
import { ApplicationModule } from './application/application.module';
import { Comment } from './model/comment.entity';
import { ReportModule } from './report/report.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '/upload/'),
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User, Class, Application, Comment, Comment]),
    UserModule,
    AuthModule,
    PostModule,
    ClassModule,
    CurriculumModule,
    LectureModule,
    MsgModule,
    CertificationModule,
    ApplicationModule,
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
