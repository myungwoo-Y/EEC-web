import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage, registerFont, Image } from 'canvas';
import { createWriteStream, readFileSync, writeFileSync } from 'fs';
import { PDFDocument }  from 'pdf-lib';

const fontKit = require ('@pdf-lib/fontkit');

@Injectable()
export class CertificationService {
  async getCertifications() {
    const document = await PDFDocument.load(readFileSync(join(process.cwd(), '/assets/certification.pdf')));
    document.registerFontkit(fontKit);
    const firstPage = document.getPage(0);

    const fontBytes = readFileSync(join(process.cwd(), '/assets/ChosunGs.TTF'));
    const customFont = await document.embedFont(fontBytes);

    firstPage.moveTo(120, 751);
    firstPage.drawText(`제    ${1}    호`, {
      size: 15,
      font: customFont,
    });

    firstPage.moveTo(208, 578);
    firstPage.drawText('나우', {
      size: 19,
      font: customFont,
    });
    firstPage.moveTo(208, 544);
    firstPage.drawText('개발자', {
      size: 19,
      font: customFont,
    });
    firstPage.moveTo(208, 510);
    firstPage.drawText('양명우', {
      size: 19,
      font: customFont,
    });


    firstPage.moveTo(122, 315);
    firstPage.drawText(`(교육기간: 2023년 7월 30일 ~ 2023년 7월 30일)`, {
      size: 18,
      font: customFont,
    });

    firstPage.moveTo(226, 195);
    firstPage.drawText(`2023년 7월 30일`, {
      size: 18,
      font: customFont,
    });


    writeFileSync(join(process.cwd(), '/assets/dist/certification_test.pdf'), await document.save());

  }

  async getCourseCertifications() {}
}
