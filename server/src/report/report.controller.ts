import {
  Body,
  Post,
  Controller,
  UploadedFiles,
  UseInterceptors,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateReportDto, UpdateReportDto } from './report.dto';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
    @Param('reportId') reportId: number,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    return this.reportService.updateReport({
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
