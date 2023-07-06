import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FileService from 'src/file/file.service';
import { CreateClassDto } from './class.dto';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(private fileService: FileService, private classService: ClassService) {}
  @Post('/')
  @UseInterceptors(FileInterceptor('thumbnailImage'))
  async creatClass(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000000 }), // 1GB
        ],
        fileIsRequired: false,
      }),
    )
    thumbnailImage: Express.Multer.File,
    @Body() createClassDto: CreateClassDto,
  ) {
    const newClass = await this.classService.createClass(createClassDto);

    const fileName = Buffer.from(thumbnailImage.originalname, 'latin1').toString();
    const newFile = await this.fileService.saveLocalFileData({
      filename: fileName,
      mimetype: thumbnailImage.mimetype,
      path: thumbnailImage.filename,
      classId: newClass?.classId,
    });

    await this.classService.updateThumbnail(newClass.classId, newFile.fileId);

    return newClass;
  }

  @Get('/')
  getClasses() {
    return this.classService.getClasses();
  }
}
