import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Class from 'src/model/class.entity';
import Curriculum from 'src/model/curriculum.entity';
import Lecture from 'src/model/lecture.entity';
import { LectureController } from './lecture.controller';
import { LectureService } from './lecture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Curriculum, Lecture])
  ],
  providers: [LectureService],
  controllers: [LectureController]
})
export class LectureModule {}
