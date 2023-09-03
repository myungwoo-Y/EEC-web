import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
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

  @Put('/:lectureId')
  updateLecture(
    @Param('lectureId') lectureId: number,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    return this.lectureService.updateLecture({
      lectureId,
      updateLectureDto,
    });
  }

  @Delete('/:lectureId')
  deleteLecture(@Param('lectureId') lectureId: number) {
    return this.lectureService.deleteLecture(lectureId);
  }

  @Get()
  async findAllLecture(@Query('curriculumId') curriculumId: number) {
    return this.lectureService.findAllLecture(curriculumId);
  }
}
