import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Certification } from './../model/certification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCertificationDto, DeleteUserInCertificationDto } from './certification.dto';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { readFileSync, writeFileSync } from 'fs';
import { PDFDocument, PDFFont } from 'pdf-lib';
import * as AdmZip from 'adm-zip';
import { toFullDate } from 'src/lib/date';
import { User } from 'src/model/user.entity';
const fontKit = require('@pdf-lib/fontkit');

@Injectable()
export class CertificationService {
  fontBytes: Buffer;

  constructor(
    @InjectRepository(Certification)
    private certificationRepository: Repository<Certification>,
    private userService: UserService,
  ) {
    this.fontBytes = readFileSync(
      join(process.cwd(), '/assets/font/ChosunGs.TTF'),
    );
  }

  async findAllCertifications() {
    const certifications = await this.certificationRepository.find({
      relations: {
        users: true,
      },
    });
    return certifications
      .map((certification) =>
        certification.users.map((user) => ({
          ...user,
          ...certification,
          users: null,
        })),
      )
      .flat();
  }

  async deleteUserInCertification(updateDto: DeleteUserInCertificationDto) {
    const { certificationId, userId } = updateDto;
    const certification = await this.certificationRepository.findOne({
      where: {
        certificationId: certificationId
      },
      relations: {
        users: true
      }
    });

    certification.users = certification.users.filter((user) => user.userId !== userId);

    if (!certification.users.length) {
      return await this.certificationRepository.delete({
        certificationId,
      });
    }

    return await this.certificationRepository.save(certification);
  }

  async insertCertifications(
    createCertificationDtos: CreateCertificationDto[],
  ) {
    if (
      !createCertificationDtos.length ||
      createCertificationDtos.length === 0
    ) {
      return;
    }
    const dto = createCertificationDtos[0];
    const certification = new Certification();
    certification.issueNumber = dto.issueNumber;
    certification.title = dto.title;
    certification.startDate = new Date(dto.startDate);
    certification.endDate = new Date(dto.endDate);
    certification.certificationDate = new Date(dto.certificationDate);

    const users = await Promise.all(
      createCertificationDtos.map<Promise<User>>(async ({ userId }) => {
        return await this.userService.findOne({ userId });
      }),
    );
    certification.users = users;

    await this.certificationRepository.save(certification);
  }

  async getCertifications(createCertificationDtos: CreateCertificationDto[]) {
    const zip = new AdmZip();

    await Promise.all(
      createCertificationDtos.map(
        async ({
          issueNumber,
          department,
          jobLevel,
          name,
          startDate,
          endDate,
          certificationDate,
        }) => {
          const certificationDoucment = await PDFDocument.load(
            readFileSync(join(process.cwd(), '/assets/pdf/certification.pdf')),
            { updateMetadata: false },
          );
          certificationDoucment.registerFontkit(fontKit);
          const certificationFont = await certificationDoucment.embedFont(
            this.fontBytes,
            { subset: true },
          );
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
          firstPage.drawText(
            `(교육기간: ${toFullDate(startDate)} ~ ${toFullDate(endDate)})`,
            {
              size: 18,
              font: certificationFont,
            },
          );

          firstPage.moveTo(226, 195);
          firstPage.drawText(toFullDate(certificationDate), {
            size: 18,
            font: certificationFont,
          });

          const file = await certificationDoucment.save();
          zip.addFile(
            `수료증_${department}_${jobLevel}_${name}.pdf`,
            Buffer.from(file),
          );
        },
      ),
    );
    return zip.toBuffer();
  }

  async getCourseCertifications(
    createCertificationDtos: CreateCertificationDto[],
  ) {
    const zip = new AdmZip();

    await Promise.all(
      createCertificationDtos.map(
        async ({
          issueNumber,
          department,
          jobLevel,
          name,
          startDate,
          endDate,
          certificationDate,
        }) => {
          const courseCertificationDocument = await PDFDocument.load(
            readFileSync(
              join(process.cwd(), '/assets/pdf/courseCertification.pdf'),
            ),
            { updateMetadata: false },
          );
          courseCertificationDocument.registerFontkit(fontKit);
          const courseCertificationFont =
            await courseCertificationDocument.embedFont(this.fontBytes, {
              subset: true,
            });

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
          firstPage.drawText(
            `(교육기간: ${toFullDate(startDate)} ~ ${toFullDate(endDate)})`,
            {
              size: 18,
              font: courseCertificationFont,
            },
          );

          firstPage.moveTo(226, 195);
          firstPage.drawText(toFullDate(certificationDate), {
            size: 18,
            font: courseCertificationFont,
          });

          const file = await courseCertificationDocument.save();
          zip.addFile(
            `이수증_${department}_${jobLevel}_${name}.pdf`,
            Buffer.from(file),
          );
        },
      ),
    );

    return zip.toBuffer();
  }
}
