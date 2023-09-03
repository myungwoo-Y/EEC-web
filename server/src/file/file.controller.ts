import {
  Controller,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import FileService from './file.service';

@Controller('/upload')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createFiles(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000000 }), // 1GB
        ],
        fileIsRequired: false,
      }),
    )
      files: Array<Express.Multer.File>,
  ) {

    return Promise.all(
      files.map(async (file) => await this.fileService.uploadFile({ file })),
    );
  }
}
