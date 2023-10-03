import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Certification, CertificationType } from './../model/certification.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCertificationDto,
  DeleteUserInCertificationDto,
} from './certification.dto';
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
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async findUserCertifications(userId) {
    const user = await this.userRepository.findOne({
      where: {
        userId,
      },
      relations: {
        certifications: true,
      },
    });

    return user.certifications
      .map((certification) => ({
        ...user,
        ...certification,
        users: null,
      }))
      .flat();
  }

  async getUserCertificationPdf(userId: number, certificationId: number) {
    const certification = await this.certificationRepository.findOneBy({certificationId});
    const user = await this.userRepository.findOneBy({userId});

    let file: Uint8Array;
    const params = {
      certificationDate: certification.certificationDate,
      startDate: certification.startDate,
      endDate: certification.endDate,
      issueNumber: certification.issueNumber,
      department: user.department,
      jobLevel: user.jobLevel,
      name: user.name
    };
    
    if (certification.type === CertificationType.Normal) {
      file = await this.writeCertificationPdf(params);
    } else {
      file = await this.writeCourseCertificationPdf(params);
    }

    const type = certification.type === CertificationType.Normal ? '수료증' : '이수증';
    const fileName = `${type}_${params.department}_${params.jobLevel}_${params.name}.pdf`;
    
    const fileBuffer = Buffer.from(file);
    return {file: fileBuffer, fileName};
  }

  async deleteUserInCertification(updateDto: DeleteUserInCertificationDto) {
    const { certificationId, userId } = updateDto;
    const certification = await this.certificationRepository.findOne({
      where: {
        certificationId: certificationId,
      },
      relations: {
        users: true,
      },
    });

    certification.users = certification.users.filter(
      (user) => user.userId !== userId,
    );

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
    certification.type = dto.type;
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

  async writeCertificationPdf({
    issueNumber,
    department,
    jobLevel,
    name,
    startDate,
    endDate,
    certificationDate,
  }: {
    issueNumber: number;
    department: string;
    jobLevel: string;
    name: string;
    startDate: string | Date;
    endDate: string | Date;
    certificationDate: string | Date;
  }) {
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

    return certificationDoucment.save();
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
          const file = await this.writeCertificationPdf({
            issueNumber,
            department,
            jobLevel,
            name,
            startDate,
            endDate,
            certificationDate,
          });
          zip.addFile(
            `수료증_${department}_${jobLevel}_${name}.pdf`,
            Buffer.from(file),
          );
        },
      ),
    );
    return zip.toBuffer();
  }

  async writeCourseCertificationPdf({
    issueNumber,
    department,
    jobLevel,
    name,
    startDate,
    endDate,
    certificationDate,
  }: {
    issueNumber: number;
    department: string;
    jobLevel: string;
    name: string;
    startDate: string | Date;
    endDate: string | Date;
    certificationDate: string | Date;
  }) {
    const courseCertificationDocument = await PDFDocument.load(
      readFileSync(join(process.cwd(), '/assets/pdf/courseCertification.pdf')),
      { updateMetadata: false },
    );
    courseCertificationDocument.registerFontkit(fontKit);
    const courseCertificationFont = await courseCertificationDocument.embedFont(
      this.fontBytes,
      {
        subset: true,
      },
    );

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

    return courseCertificationDocument.save();
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
          const file = await this.writeCourseCertificationPdf({
            issueNumber,
            department,
            jobLevel,
            name,
            startDate,
            endDate,
            certificationDate,
          });
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
