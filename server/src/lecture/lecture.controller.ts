import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateLectureDto, SimpleUpdateLectureDto, UpdateLectureDto } from './lecture.dto';
import { LectureService } from './lecture.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-role.decorator';
import { UserRole } from 'src/model/user.entity';
import { RoleGuard } from 'src/auth/role.guard';


@Controller('lecture')
export class LectureController {
  constructor(private lectureService: LectureService) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  createLecture(@Body() createLectureDto: CreateLectureDto) {
    return this.lectureService.createLecture(createLectureDto);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/init')
  simpleUpdateLecture(@Body() updateLectureDto: SimpleUpdateLectureDto[]) {
    return this.lectureService.updateLectureBulk(updateLectureDto);
  }

  @HasRoles(UserRole.ADMIN, UserRole.LECTURER)
  @UseGuards(JwtAuthGuard, RoleGuard)
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

  @HasRoles(UserRole.ADMIN, UserRole.LECTURER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/:lectureId')
  deleteLecture(@Param('lectureId') lectureId: number) {
    return this.lectureService.deleteLecture(lectureId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllLecture(@Query('curriculumId') curriculumId: number) {
    return this.lectureService.findAllLecture(curriculumId);
  }
}
