import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileService from 'src/file/file.service';
import { Report } from 'src/model/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private fileService: FileService,
  ) {}
  async addReport({
    createReportDto,
    revisedFiles = [],
    presentationFiles = [],
    reportFiles = [],
    pressFiles = [],
    paperFiles = [],
  }: {
    revisedFiles?: Express.Multer.File[];
    presentationFiles?: Express.Multer.File[];
    reportFiles?: Express.Multer.File[];
    pressFiles?: Express.Multer.File[];
    paperFiles?: Express.Multer.File[];
    createReportDto: CreateReportDto;
  }) {
    const newReport = await this.reportRepository.insert(createReportDto);

    const { reportId } = newReport.raw[0];

    if (!reportId) return;

    const revisedFileUploadPromise = revisedFiles.map((revisedFile) =>
      this.fileService.uploadFileKeyVal({
        file: revisedFile,
        columnKey: 'reportRevised',
        idKey: 'reportId',
        id: reportId,
      }),
    );
    const presentationFilesUploadPromise = presentationFiles.map(
      (presentationFile) =>
        this.fileService.uploadFileKeyVal({
          file: presentationFile,
          columnKey: 'reportRevised',
          idKey: 'reportId',
          id: reportId,
        }),
    );
    const reportFilesUploadPromise = reportFiles.map((reportFile) =>
      this.fileService.uploadFileKeyVal({
        file: reportFile,
        columnKey: 'reportRevised',
        idKey: 'reportId',
        id: reportId,
      }),
    );
    const pressFilesUploadPromise = pressFiles.map((pressFile) =>
      this.fileService.uploadFileKeyVal({
        file: pressFile,
        columnKey: 'reportRevised',
        idKey: 'reportId',
        id: reportId,
      }),
    );
    const paperFilesUploadPromise = paperFiles.map((paperFile) =>
      this.fileService.uploadFileKeyVal({
        file: paperFile,
        columnKey: 'reportRevised',
        idKey: 'reportId',
        id: reportId,
      }),
    );
    await Promise.all([
      ...revisedFileUploadPromise,
      ...presentationFilesUploadPromise,
      ...reportFilesUploadPromise,
      ...pressFilesUploadPromise,
      ...paperFilesUploadPromise,
    ]);
  }
}
