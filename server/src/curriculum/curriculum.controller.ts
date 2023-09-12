import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateCurriculumDto, UpdateCurriculumDto } from './curriculum.dto';
import { CurriculumService } from './curriculum.service';
import { HasRoles } from 'src/auth/has-role.decorator';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRole } from 'src/model/user.entity';

@Controller('curriculum')
export class CurriculumController {
  constructor(private curriculumService: CurriculumService) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  createCurriculum(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.createCurriculum(createCurriculumDto);
  }

  @HasRoles(UserRole.ADMIN, UserRole.LECTURER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put()
  updateurriculum(@Body() updateCurriculumDtos: UpdateCurriculumDto[]) {
    return this.curriculumService.updateCurriculum(updateCurriculumDtos);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/:curriculumId')
  deleteurriculum(@Param('curriculumId') curriculumId: number) {
    return this.curriculumService.deleteCurriculum(curriculumId);
  }

  @Get()
  findAllCurriculum(@Query('classId') classId: number,  @Query('classOrder') classOrder: number) {
    return this.curriculumService.findAllCurriculum(classId, classOrder);
  }
}
