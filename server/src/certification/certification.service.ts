import { CreateCertificationDto } from './certification.dto';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument, PDFFont }  from 'pdf-lib';
import * as AdmZip from 'adm-zip';

const fontKit = require ('@pdf-lib/fontkit');

@Injectable()
export class CertificationService {
  certificationDoucment: PDFDocument;
  courseCertificationDocument: PDFDocument;
  certificationFont: PDFFont;
  courseCertificationFont: PDFFont;

  constructor() {
    this.initDoucuments();
  }

  async initDoucuments() {
    this.certificationDoucment = await PDFDocument.load(readFileSync(join(process.cwd(), '/assets/pdf/certification.pdf')), { updateMetadata: false });
    this.certificationDoucment.registerFontkit(fontKit);

    this.courseCertificationDocument = await PDFDocument.load(readFileSync(join(process.cwd(), '/assets/pdf/courseCertification.pdf')), { updateMetadata: false });
    this.courseCertificationDocument.registerFontkit(fontKit);

    const fontBytes = readFileSync(join(process.cwd(), '/assets/font/ChosunGs.TTF'));
    this.certificationFont = await this.certificationDoucment.embedFont(fontBytes, { subset: true });
    this.courseCertificationFont = await this.courseCertificationDocument.embedFont(fontBytes, { subset: true });
  }

  async getCertifications(createCertificationDtos: CreateCertificationDto[]) {
    const zip = new AdmZip();

    await Promise.all(createCertificationDtos.map(async ({ issueNumber, department, jobLevel, name, startDate, endDate, certificationDate}) => {
      const firstPage = this.certificationDoucment.getPage(0);

      firstPage.moveTo(120, 751);
      firstPage.drawText(`제    ${issueNumber}    호`, {
        size: 15,
        font: this.certificationFont,
      });
  
      firstPage.moveTo(208, 578);
      firstPage.drawText(department, {
        size: 19,
        font: this.certificationFont,
      });
      firstPage.moveTo(208, 544);
      firstPage.drawText(jobLevel, {
        size: 19,
        font: this.certificationFont,
      });
      firstPage.moveTo(208, 510);
      firstPage.drawText(name, {
        size: 19,
        font: this.certificationFont,
      });
  
      firstPage.moveTo(122, 315);
      firstPage.drawText(`(교육기간: ${startDate} ~ ${endDate})`, {
        size: 18,
        font: this.certificationFont,
      });
  
      firstPage.moveTo(226, 195);
      firstPage.drawText(certificationDate, {
        size: 18,
        font: this.certificationFont,
      });
  
      
      const file = await this.certificationDoucment.save();
      zip.addFile(`수료증_${department}_${jobLevel}_${name}.pdf`, Buffer.from(file));
    }));
    zip.writeZip(join(process.cwd(), '/assets/dist/test.zip'));
    return zip.toBuffer();
  }

  async getCourseCertifications(createCertificationDtos: CreateCertificationDto[]) {
    const firstPage = this.courseCertificationDocument.getPage(0);

    firstPage.moveTo(120, 751);
    firstPage.drawText(`제    ${1}    호`, {
      size: 15,
      font: this.courseCertificationFont,
    });

    firstPage.moveTo(208, 578);
    firstPage.drawText('나우', {
      size: 19,
      font: this.courseCertificationFont,
    });
    firstPage.moveTo(208, 544);
    firstPage.drawText('개발자', {
      size: 19,
      font: this.courseCertificationFont,
    });
    firstPage.moveTo(208, 510);
    firstPage.drawText('양명우', {
      size: 19,
      font: this.courseCertificationFont,
    });

    firstPage.moveTo(330, 408);
    firstPage.drawText('직급', {
      size: 19,
      font: this.courseCertificationFont,
    });

    firstPage.moveTo(122, 315);
    firstPage.drawText(`(교육기간: 2023년 7월 30일 ~ 2023년 7월 30일)`, {
      size: 18,
      font: this.courseCertificationFont,
    });

    firstPage.moveTo(226, 195);
    firstPage.drawText(`2023년 7월 30일`, {
      size: 18,
      font: this.courseCertificationFont,
    });


    writeFileSync(join(process.cwd(), '/assets/dist/course_certification.pdf'), await this.courseCertificationDocument.save());
  }
}
