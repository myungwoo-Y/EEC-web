import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Curriculum from 'src/model/curriculum.entity';
import { Repository } from 'typeorm';
import { CreateCurriculumDto } from './curriculum.dto';

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
      }
    });
  }
}
