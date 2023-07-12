import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateCurriculumDto, UpdateCurriculumDto } from './curriculum.dto';
import { CurriculumService } from './curriculum.service';

@Controller('curriculum')
export class CurriculumController {
  constructor(private curriculumService: CurriculumService) {}

  @Post()
  createCurriculum(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.createCurriculum(createCurriculumDto);
  }

  @Put()
  Updateurriculum(@Body() updateCurriculumDtos: UpdateCurriculumDto[]) {
    return this.curriculumService.updateCurriculum(updateCurriculumDtos);
  }

  @Get()
  findAllCurriculum(@Query('classId') classId: number,  @Query('classOrder') classOrder: number) {
    return this.curriculumService.findAllCurriculum(classId, classOrder);
  }
}
