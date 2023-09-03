import {
  Body,
  Post,
  Controller,
  UploadedFiles,
  UseInterceptors,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateReportDto, UpdateReportDto } from './report.dto';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get('/:reportId')
  findOne(@Param('reportId') reportId: number) {
    return this.reportService.findOne(reportId);
  }

  @Put('/:reportId')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'revisedFiles' },
      { name: 'presentationFiles' },
      { name: 'reportFiles' },
      { name: 'pressFiles' },
      { name: 'paperFiles' },
    ]),
  )
  updateReport(
    @UploadedFiles()
    files: {
      revisedFiles?: Express.Multer.File[];
      presentationFiles?: Express.Multer.File[];
      reportFiles?: Express.Multer.File[];
      pressFiles?: Express.Multer.File[];
      paperFiles?: Express.Multer.File[];
    },
    @Param('reportId') reportId: number,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportService.updateReport({
      ...files,
      updateReportDto,
      reportId,
    });
  }

  @Post()
  addReport(
    @Body() createReportDto: CreateReportDto,
  ) {
    return this.reportService.addReport({
      createReportDto,
    });
  }
}
