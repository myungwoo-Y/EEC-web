import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import FileService from 'src/file/file.service';
import Class from 'src/model/class.entity';
import Curriculum from 'src/model/curriculum.entity';
import File from 'src/model/file.entity';
import Lecture from 'src/model/lecture.entity';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Curriculum, Lecture, File]),
    FileModule,
  ],
  providers: [LectureService, FileService],
  controllers: [LectureController]
})
export class LectureModule {}
