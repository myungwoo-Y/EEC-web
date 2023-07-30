import { createReadStream } from 'fs';
import { CertificationService } from './certification.service';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CreateCertificationDto, CertificationType } from './certification.dto';
import { Response } from 'express';
import { Readable } from 'stream';
import { Blob } from "buffer";


@Controller('certification')
export class CertificationController {
  constructor(private certificationService: CertificationService) {}

  @Post('/:type')
  async getCertifications(
    @Res() res: Response,
    @Param('type') type: string,
    @Body() createCertificationDtos: CreateCertificationDto[],
  ) {
    let buffer: Buffer;
    if (CertificationType.Normal === type) {
      buffer = await this.certificationService.getCertifications(createCertificationDtos);
    } else {
      buffer = await this.certificationService.getCourseCertifications(createCertificationDtos);
    }

    res.send(buffer.toJSON());
  }
}
