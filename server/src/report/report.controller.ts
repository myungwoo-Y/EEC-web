import { Body, Post, Controller, UploadedFiles, UseInterceptors, Get } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateReportDto } from './report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor (private reportService: ReportService) {}

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'revisedFiles' },
      { name: 'presentationFiles' },
      { name: 'reportFiles' },
      { name: 'pressFiles' },
      { name: 'paperFiles' },
    ]),
  )
  updateLecture(
    @UploadedFiles()
    files: {
      revisedFiles?: Express.Multer.File[];
      presentationFiles?: Express.Multer.File[];
      reportFiles?: Express.Multer.File[];
      pressFiles?: Express.Multer.File[];
      paperFiles?: Express.Multer.File[];
    },
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportService.addReport({
      ...files,
      createReportDto
    });
  }
}
