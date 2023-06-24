import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import File from '../model/file.entity';
import { FileController } from './file.controller';
import FileService from './file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
  ],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService]
})
export class FileModule {}

