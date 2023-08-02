import { CertificationType } from './../model/certification.entity';
import { createReadStream } from 'fs';
import { CertificationService } from './certification.service';
import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCertificationDto, DeleteUserInCertificationDto } from './certification.dto';
import { Response } from 'express';
import { Readable } from 'stream';
import { Blob } from "buffer";


@Controller('certification')
export class CertificationController {
  constructor(private certificationService: CertificationService) {}

  @Post('/:type')
  async getCertificationsZip(
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
    this.certificationService.insertCertifications(createCertificationDtos);

    res.send(buffer.toJSON());
  }

  @Get()
  async findAllCertifications() {
    return this.certificationService.findAllCertifications();
  }

  @Put('/delete')
  async deleteUserInCertification(@Body() deleteUserInCertificationDto: DeleteUserInCertificationDto) {
    return this.certificationService.deleteUserInCertification(deleteUserInCertificationDto);
  }
}
