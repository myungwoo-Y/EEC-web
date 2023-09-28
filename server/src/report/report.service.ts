import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileService from 'src/file/file.service';
import File from 'src/model/file.entity';
import { Report } from 'src/model/report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto, UpdateReportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    private fileService: FileService,
  ) {}

  findAll() {
    return this.reportRepository.find({
      relations: {
        user: true,
      },
    });
  }

  findOne(reportId: number) {
    return this.reportRepository.findOne({
      where: {
        reportId,
      },
      relations: {
        user: true,
        revisedFiles: true,
        presentationFiles: true,
        reportFiles: true,
        pressFiles: true,
        paperFiles: true,
      },
    });
  }

  async updateReport({
    reportId,
    updateReportDto: {
      revisedFiles,
      presentationFiles,
      reportFiles,
      pressFiles,
      paperFiles,
      ...dtoWithoutFiles
    }
  }: {
    reportId: number;
    updateReportDto: UpdateReportDto
  }) {

    await this.reportRepository.update(reportId, { ...dtoWithoutFiles });

    await this.fileService.unlinkFiles({
      parentColumnName: 'reportRevised',
      parentIdName: 'reportId',
      parentId: reportId,
    });

    await this.fileService.unlinkFiles({
      parentColumnName: 'reportPresentation',
      parentIdName: 'reportId',
      parentId: reportId,
    });

    await this.fileService.unlinkFiles({
      parentColumnName: 'reportReport',
      parentIdName: 'reportId',
      parentId: reportId,
    });

    await this.fileService.unlinkFiles({
      parentColumnName: 'reportPress',
      parentIdName: 'reportId',
      parentId: reportId,
    });

    await this.fileService.unlinkFiles({
      parentColumnName: 'reportPaper',
      parentIdName: 'reportId',
      parentId: reportId,
    });

    await this.addFiles({
      reportId,
      revisedFiles,
      presentationFiles,
      reportFiles,
      pressFiles,
      paperFiles,
    });
  }

  async addReport({
    createReportDto,
  }: {
    createReportDto: CreateReportDto;
  }) {
    const {
      year,
      quarter,
      certificationDate,
      basis,
      userId,
      revisedFiles,
      presentationFiles,
      reportFiles,
      pressFiles,
      paperFiles,
    } = createReportDto;

    const newReport = await this.reportRepository.insert({
      year,
      quarter,
      certificationDate,
      basis,
      user: {
        userId,
      },
    });

    const { reportId } = newReport.raw[0];

    if (!reportId) return;

    await this.addFiles({
      reportId,
      revisedFiles,
      presentationFiles,
      reportFiles,
      pressFiles,
      paperFiles,
    });
  }

  async addFiles({
    reportId,
    revisedFiles = [],
    presentationFiles = [],
    reportFiles = [],
    pressFiles = [],
    paperFiles = [],
  }: {
    reportId: number;
    revisedFiles: File[];
    presentationFiles: File[];
    reportFiles: File[];
    pressFiles: File[];
    paperFiles: File[];
  }) {
    const revisedFileUploadPromise = revisedFiles.map((revisedFile) =>
      this.fileService.linkFileToParent({
        fileId: revisedFile.fileId,
        parentColumnName: 'reportRevised',
        parentIdName: 'reportId',
        parentId: reportId,
      }),
    );
    const presentationFilesUploadPromise = presentationFiles.map(
      (presentationFile) =>
        this.fileService.linkFileToParent({
          fileId: presentationFile.fileId,
          parentColumnName: 'reportPresentation',
          parentIdName: 'reportId',
          parentId: reportId,
        }),
    );
    const reportFilesUploadPromise = reportFiles.map((reportFile) =>
      this.fileService.linkFileToParent({
        fileId: reportFile.fileId,
        parentColumnName: 'reportReport',
        parentIdName: 'reportId',
        parentId: reportId,
      }),
    );
    const pressFilesUploadPromise = pressFiles.map((pressFile) =>
      this.fileService.linkFileToParent({
        fileId: pressFile.fileId,
        parentColumnName: 'reportPress',
        parentIdName: 'reportId',
        parentId: reportId,
      }),
    );
    const paperFilesUploadPromise = paperFiles.map((paperFile) =>
      this.fileService.linkFileToParent({
        fileId: paperFile.fileId,
        parentColumnName: 'reportPaper',
        parentIdName: 'reportId',
        parentId: reportId,
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
