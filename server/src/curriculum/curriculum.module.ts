import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Class from 'src/model/class.entity';
import Curriculum from 'src/model/curriculum.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Curriculum])
  ],
  providers: [CurriculumService],
  controllers: [CurriculumController]
})
export class CurriculumModule {}
