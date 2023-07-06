import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from 'src/file/file.module';
import Class from 'src/model/class.entity';
import File from 'src/model/file.entity';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, File]),
    FileModule,
    MulterModule.register({
      dest: './upload',
    })
  ],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
