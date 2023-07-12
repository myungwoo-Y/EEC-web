import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Curriculum from 'src/model/curriculum.entity';
import { Repository } from 'typeorm';
import { CreateCurriculumDto, UpdateCurriculumDto } from './curriculum.dto';

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(Curriculum)
    private curriculumRepository: Repository<Curriculum>,
  ) {}

  async createCurriculum(createCurriculumDto: CreateCurriculumDto) {
    const { title, classOrder, classId } = createCurriculumDto;
    const injectResult = await this.curriculumRepository.insert({
      title: title,
      classOrder: classOrder,
      class: {
        classId
      }
    });

    return injectResult.raw[0];
  }

  async updateCurriculum(updateCurriculumDtos: UpdateCurriculumDto[]) {
    const result = [];
    
    await Promise.all(updateCurriculumDtos.map(async (updateCurriculumDto) => {
      const { curriculumId, title } = updateCurriculumDto;
      const injectResult = await this.curriculumRepository.update(curriculumId, {
        title
      });
      result.push(injectResult);
    }));

    return result;
  }

  async deleteCurriculum(curriculumId: number) {
    return await this.curriculumRepository.delete(curriculumId);
  }


  async findAllCurriculum(classId: number, classOrder: number) {
    return this.curriculumRepository.find({
      relations: {
        class: true
      },
      where: {
        classOrder,
        class: {
          classId
        }
      },
      order: {
        curriculumId: 'ASC'
      }
    });
  }
}
