import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Lecture from 'src/model/lecture.entity';
import { Repository } from 'typeorm';
import { CreateLectureDto, UpdateLectureDto } from './lecture.dto';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
  ) {}

  async createLecture(createLectureDto: CreateLectureDto) {
    const { title, curriculumId } = createLectureDto;
    const injectResult = await this.lectureRepository.insert({
      title: title,
      curriculum: {
        curriculumId
      }
    });

    return injectResult.raw[0];
  }

  async updateLecture(updateLectureDtos: UpdateLectureDto[]) {
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

  async deleteLecture(lectureId: number) {
    return await this.lectureRepository.delete(lectureId);
  }


  async findAllLecture(curriculumId) {
    return this.lectureRepository.find({
      relations: {
        curriculum: true
      },
      where: {
        curriculum: {
          curriculumId
        }
      },
      order: {
        lectureId: 'ASC'
      }
    });
  }
}
