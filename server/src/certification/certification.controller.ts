import { createReadStream } from 'fs';
import { CertificationService } from './certification.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateCertificationDto, CertificationType } from './certification.dto';
import { Response } from 'express';
import { Readable } from 'stream';


@Controller('certification')
export class CertificationController {
  constructor(private certificationService: CertificationService) {}

  @Post('/:type')
  async getCertifications(
    @Res() res: Response,
    @Param('type') type: string,
    @Body() createCertificationDtos: CreateCertificationDto[],
  ) {
    // if (CertificationType.Normal === type) {
    //   return this.certificationService.getCertifications(createCertificationDtos);
    // } else {
    //   return this.certificationService.getCourseCertifications(createCertificationDtos);
    // }

    const buffer = await this.certificationService.getCertifications(createCertificationDtos);
    const fileStream = Readable.from(buffer);
    res.set(
      'Content-Disposition',
      'attachment; filename=some_file_name.zip'
    );
    fileStream.pipe(res);
  }
}
