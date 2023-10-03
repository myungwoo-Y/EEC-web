import { CertificationType } from './../model/certification.entity';
import { createReadStream } from 'fs';
import { CertificationService } from './certification.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  CreateCertificationDto,
  DeleteUserInCertificationDto,
} from './certification.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { HasRoles } from 'src/auth/has-role.decorator';
import { UserRole } from 'src/model/user.entity';
import { readFile } from 'fs';

@Controller('certification')
export class CertificationController {
  constructor(private certificationService: CertificationService) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/:type')
  async getCertificationsZip(
    @Res() res: Response,
    @Param('type') type: string,
    @Body() createCertificationDtos: CreateCertificationDto[],
  ) {
    let buffer: Buffer;
    if (CertificationType.Normal === type) {
      buffer = await this.certificationService.getCertifications(
        createCertificationDtos,
      );
    } else {
      buffer = await this.certificationService.getCourseCertifications(
        createCertificationDtos,
      );
    }
    this.certificationService.insertCertifications(createCertificationDtos);

    res.send(buffer.toJSON());
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/all')
  async findAllCertifications() {
    return this.certificationService.findAllCertifications();
  }

  @HasRoles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/:userId')
  async findUserCertifications(@Param('userId') userId: number) {
    return this.certificationService.findUserCertifications(userId);
  }

  @HasRoles(UserRole.ADMIN, UserRole.STUDENT)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':certificationId/user/:userId')
  async getCertificationPdf(
    @Param('userId') userId: number,
    @Param('certificationId') certificationId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const {file, fileName} = await this.certificationService.getUserCertificationPdf(
      userId,
      certificationId,
    );

    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/pdf',
      'Content-Length': file.length,
      'Content-Disposition': `attachment; filename=${encodeURIComponent(fileName)}`
    });

    res.send(file);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put('/delete')
  async deleteUserInCertification(
    @Body() deleteUserInCertificationDto: DeleteUserInCertificationDto,
  ) {
    return this.certificationService.deleteUserInCertification(
      deleteUserInCertificationDto,
    );
  }
}
