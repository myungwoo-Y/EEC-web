import { CertificationService } from './certification.service';
import { Controller, Get } from '@nestjs/common';

@Controller('certification')
export class CertificationController {
  constructor(private certificationService: CertificationService) {}

  @Get()
  getCertifications() {
    return this.certificationService.getCertifications();
  }
}
