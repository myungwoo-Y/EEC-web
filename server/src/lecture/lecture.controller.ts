import { Body, Controller, Delete, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'lecturefiles' },
      { name: 'referenceFiles' },
    ]),
  )
  updateLecture(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000000 }), // 1GB
        ],
        fileIsRequired: false,
      }),
    )
    files: {
      lecturefiles?: Express.Multer.File[];
      referenceFiles?: Express.Multer.File[];
    },
    @Param('lectureId') lectureId: number,
    @Body() updateLectureDto: UpdateLectureDto,
  ) {
    console.log(files);
    // return this.lectureService.updateLecture(lectureId, updateLectureDto);
  }

  @Delete('/:lectureId')
  deleteLecture(@Param('lectureId') lectureId: number) {
    return this.lectureService.deleteLecture(lectureId);
  }

  @Get()
  findAllLecture(@Query('curriculumId') curriculumId: number) {
    return this.lectureService.findAllLecture(curriculumId);
  }
}
