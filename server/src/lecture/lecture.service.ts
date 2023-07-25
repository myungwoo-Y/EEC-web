import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileService from 'src/file/file.service';
import File from 'src/model/file.entity';
import Lecture from 'src/model/lecture.entity';
import { Repository } from 'typeorm';
import { CreateLectureDto, SimpleUpdateLectureDto, UpdateLectureDto } from './lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    private fileService: FileService,
  ) {}

  async createLecture(createLectureDto: CreateLectureDto) {
    const { title, curriculumId, adminId } = createLectureDto;
    const injectResult = await this.lectureRepository.insert({
      title: title,
      curriculum: {
        curriculumId
      },
      admin: {
        userId: adminId
      }
    });

    return injectResult.raw[0];
  }

  async updateLectureBulk(updateLectureDtos: SimpleUpdateLectureDto[]) {
    const result = [];
    
    await Promise.all(updateLectureDtos.map(async (updateLectureDto) => {
      const { lectureId, title } = updateLectureDto;
      const injectResult = await this.lectureRepository.update(lectureId, {
        title
      });
      result.push(injectResult);
    }));

    return result;
  }

  private async uploadLectureFiles(files: Express.Multer.File[]) {
    if (!files || !files.length) {
      return [];
    }

    return await Promise.all(files.map(async (file) => {
      const fileEntity = await this.fileService.uploadFile({file: file});
      console.log(fileEntity);
      return fileEntity.fileId;
    }));    
  }

  async updateLecture({
    lectureId, 
    updateLectureDto,
    lectureFiles = [],
    referenceFiles = []
  }: {
    lectureId: number,
    updateLectureDto: UpdateLectureDto,
    lectureFiles?: Express.Multer.File[],
    referenceFiles?: Express.Multer.File[],
  }) {
    const { adminId, curriculumId } = updateLectureDto;

    lectureFiles.map((lectureFile) => this.fileService.uploadFile({file: lectureFile, lectureId}));
    referenceFiles.map((referenceFile) => this.fileService.uploadFile({file: referenceFile, lectureWithReferenceId: lectureId}));

    console.log(curriculumId)
    return await this.lectureRepository.save({
      lectureId,
      ...updateLectureDto,
      admin: {
        userId: adminId,
      },
      curriculum: {
        curriculumId,
      },
    });
  }

  async deleteLecture(lectureId: number) {
    return await this.lectureRepository.delete(lectureId);
  }


  async findAllLecture(curriculumId) {
    return this.lectureRepository.find({
      relations: {
        curriculum: {
          class: true
        },
        admin: true,
        lectureFiles: true,
        referenceFiles: true
      },
      where: {
        curriculum: {
          curriculumId,
        }
      },
      order: {
        lectureId: 'ASC'
      },
    });
  }
}
