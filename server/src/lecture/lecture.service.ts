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

  async updateLecture({
    lectureId, 
    updateLectureDto,
  }: {
    lectureId: number,
    updateLectureDto: UpdateLectureDto,
  }) {
    const { adminId, curriculumId, lectureFiles, referenceFiles } = updateLectureDto;
    
    await this.fileService.unlinkFiles({
      parentColumnName: 'lecture',
      parentIdName: 'lectureId',
      parentId: lectureId,
    });

    await this.fileService.unlinkFiles({
      parentColumnName: 'lectureWithReference',
      parentIdName: 'lectureId',
      parentId: lectureId,
    });

    const lectureFileUploadPromise = lectureFiles.map((lectureFile) =>
      this.fileService.linkFileToParent({
        fileId: lectureFile.fileId,
        parentColumnName: 'lecture',
        parentIdName: 'lectureId',
        parentId: lectureId,
      }),
    );
    const referenceFileUploadPromise = referenceFiles.map((referenceFile) =>
      this.fileService.linkFileToParent({
        fileId: referenceFile.fileId,
        parentColumnName: 'lectureWithReference',
        parentIdName: 'lectureId',
        parentId: lectureId,
      }),
    );

    await Promise.all([...lectureFileUploadPromise, ...referenceFileUploadPromise]);
    
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
        lectureFiles: true,
        referenceFiles: true,
        curriculum: {
          class: true
        },
        admin: true,
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
