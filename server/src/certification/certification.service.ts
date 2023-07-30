import { CreateCertificationDto } from './certification.dto';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument, PDFFont }  from 'pdf-lib';
import * as AdmZip from 'adm-zip';
import { toFullDate } from 'src/lib/date';
const fontKit = require ('@pdf-lib/fontkit');

@Injectable()
export class CertificationService {
  fontBytes: Buffer;

  constructor() {
    this.fontBytes = readFileSync(join(process.cwd(), '/assets/font/ChosunGs.TTF'));
  }

  async getCertifications(createCertificationDtos: CreateCertificationDto[]) {
    const zip = new AdmZip();

    await Promise.all(createCertificationDtos.map(async ({ issueNumber, department, jobLevel, name, startDate, endDate, certificationDate}) => {
      const certificationDoucment = await PDFDocument.load(readFileSync(join(process.cwd(), '/assets/pdf/certification.pdf')), { updateMetadata: false });
      certificationDoucment.registerFontkit(fontKit);
      const certificationFont = await certificationDoucment.embedFont(this.fontBytes, { subset: true });
      const firstPage = certificationDoucment.getPage(0);

      firstPage.moveTo(120, 751);
      firstPage.drawText(`제    ${issueNumber}    호`, {
        size: 15,
        font: certificationFont,
      });
  
      firstPage.moveTo(208, 578);
      firstPage.drawText(department, {
        size: 19,
        font: certificationFont,
      });
      firstPage.moveTo(208, 544);
      firstPage.drawText(jobLevel, {
        size: 19,
        font: certificationFont,
      });
      firstPage.moveTo(208, 510);
      firstPage.drawText(name, {
        size: 19,
        font: certificationFont,
      });
  
      firstPage.moveTo(122, 315);
      firstPage.drawText(`(교육기간: ${toFullDate(startDate)} ~ ${toFullDate(endDate)})`, {
        size: 18,
        font: certificationFont,
      });
  
      firstPage.moveTo(226, 195);
      firstPage.drawText(toFullDate(certificationDate), {
        size: 18,
        font: certificationFont,
      });
  
      
      const file = await certificationDoucment.save();
      zip.addFile(`수료증_${department}_${jobLevel}_${name}.pdf`, Buffer.from(file));
    }));
    return zip.toBuffer();
  }

  async getCourseCertifications(createCertificationDtos: CreateCertificationDto[]) {
    const zip = new AdmZip();

    await Promise.all(createCertificationDtos.map(async ({ issueNumber, department, jobLevel, name, startDate, endDate, certificationDate}) => {
      const courseCertificationDocument = await PDFDocument.load(readFileSync(join(process.cwd(), '/assets/pdf/courseCertification.pdf')), { updateMetadata: false });
      courseCertificationDocument.registerFontkit(fontKit);
      const courseCertificationFont = await courseCertificationDocument.embedFont(this.fontBytes, { subset: true });

      const firstPage = courseCertificationDocument.getPage(0);

      firstPage.moveTo(120, 751);
      firstPage.drawText(`제    ${issueNumber}    호`, {
        size: 15,
        font: courseCertificationFont,
      });
  
      firstPage.moveTo(208, 578);
      firstPage.drawText(department, {
        size: 19,
        font: courseCertificationFont,
      });
      firstPage.moveTo(208, 544);
      firstPage.drawText(jobLevel, {
        size: 19,
        font: courseCertificationFont,
      });
      firstPage.moveTo(208, 510);
      firstPage.drawText(name, {
        size: 19,
        font: courseCertificationFont,
      });
  
      firstPage.moveTo(330, 408);
      firstPage.drawText(jobLevel, {
        size: 19,
        font: courseCertificationFont,
      });
  
      firstPage.moveTo(122, 315);
      firstPage.drawText(`(교육기간: ${toFullDate(startDate)} ~ ${toFullDate(endDate)})`, {
        size: 18,
        font: courseCertificationFont,
      });
  
      firstPage.moveTo(226, 195);
      firstPage.drawText(toFullDate(certificationDate), {
        size: 18,
        font: courseCertificationFont,
      });

      const file = await courseCertificationDocument.save();
      zip.addFile(`이수증_${department}_${jobLevel}_${name}.pdf`, Buffer.from(file));
    }));

    return zip.toBuffer();
  }
}
