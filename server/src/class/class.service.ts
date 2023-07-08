import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Class from 'src/model/class.entity';
import { Repository } from 'typeorm';
import { CreateClassDto } from './class.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async getClasses() {
    const classes = await this.classRepository.find({
      relations: {
        thumbnailImage: true
      }
    });
    return classes;
  }

  getClass(classId: number) {
    if (classId == null) {
      return null;
    }
    return this.classRepository.findOne({
      relations: {
        thumbnailImage: true
      },
      where: {
        classId
      }
    });
  }

  async updateClass(createClassDto: CreateClassDto, classId: number) {
    return await this.classRepository.update(classId, {
      ...createClassDto
    });
  }

  async createClass(createClassDto: CreateClassDto) {
    const newClass = await this.classRepository.insert({
      title: createClassDto.title,
      description: createClassDto.description,
      target: createClassDto.target,
      detail: createClassDto.detail,
      classStart: createClassDto.classStart,
      classEnd: createClassDto.classEnd,
      registerStart: createClassDto.registerStart,
      registerEnd: createClassDto.registerEnd,
    });

    return newClass.raw[0] as Class;
  }
}
