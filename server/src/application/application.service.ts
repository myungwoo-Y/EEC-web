import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from 'src/model/application.entity';
import { Repository } from 'typeorm';
import { UpdateApplicationActivation } from './application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
  ) {}

  async findAll(classId: number) {
    return this.applicationRepository.find({
      where: {
        class: {
          classId,
        },
      },
      relations: {
        class: true,
        user: true,
      },
    });
  }

  async updateActivations(updateApplicationActivations: UpdateApplicationActivation[]) {
    return Promise.all(updateApplicationActivations.map(async (dto) => {
      return await this.applicationRepository.update(dto.applicationId, dto);
    }));
  }
}
