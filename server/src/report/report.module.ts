import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import FileService from 'src/file/file.service';
import File from 'src/model/file.entity';
import { Report } from 'src/model/report.entity';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, File]),
    FileModule,
  ],
  controllers: [ReportController],
  providers: [ReportService, FileService]
})
export class ReportModule {}
