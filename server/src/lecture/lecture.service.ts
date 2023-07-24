import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Lecture from 'src/model/lecture.entity';
import { Repository } from 'typeorm';
import { CreateLectureDto, SimpleUpdateLectureDto, UpdateLectureDto } from './lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
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

  async updateLecture(updateLectureDto: UpdateLectureDto) {
    return await this.lectureRepository.update(updateLectureDto.lectureId, {
      ...updateLectureDto,
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
