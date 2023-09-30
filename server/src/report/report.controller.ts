import {
  Body,
  Post,
  Controller,
  UseInterceptors,
  Get,
  Param,
  Put,
  UseGuards,
  Req,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateReportDto, UpdateReportDto } from './report.dto';
import { ReportService } from './report.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @Get('/:reportId')
  async findOne(@Req() req: Request, @Param('reportId') reportId: number) {
    const report = await this.reportService.findOne(reportId);

    if (this.reportService.hasPermission(req.user, report)) {
      throw new BadRequestException();
    }

    return report;
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
  async updateReport(
    @Req() req: Request,
    @Param('reportId') reportId: number,
    @Body() updateReportDto: UpdateReportDto,
  ) {
    const report = await this.reportService.findOne(reportId);

    if (this.reportService.hasPermission(req.user, report)) {
      throw new UnauthorizedException();
    }

    return this.reportService.updateReport({
      updateReportDto,
      reportId,
    });
  }

  @Post()
  addReport(@Body() createReportDto: CreateReportDto) {
    return this.reportService.addReport({
      createReportDto,
    });
  }
}
