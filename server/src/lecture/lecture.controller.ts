import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateLectureDto, SimpleUpdateLectureDto, UpdateLectureDto } from './lecture.dto';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @Post()
  createLecture(@Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.createLecture(createLectureDto);
  }

  @Put('/init')
  simpleUpdateLecture(@Body() updateLectureDto: SimpleUpdateLectureDto[]) {
    return this.lectureService.updateLectureBulk(updateLectureDto);
  }

  @Put()
  updateLecture(@Body() updateLectureDto: UpdateLectureDto) {
    return this.lectureService.updateLecture(updateLectureDto);
  }

  @Delete('/:LectureId')
  deleteLecture(@Param('LectureId') LectureId: number) {
    return this.lectureService.deleteLecture(LectureId);
  }

  @Get()
  findAllLecture(@Query('curriculumId') curriculumId: number) {
    return this.lectureService.findAllLecture(curriculumId);
  }
}
