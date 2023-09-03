import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FileService from 'src/file/file.service';
import { CreateClassDto } from './class.dto';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
  constructor(
    private fileService: FileService,
    private classService: ClassService,
  ) {}

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

    const fileName = Buffer.from(
      thumbnailImage.originalname,
      'latin1',
    ).toString();
    
    await this.fileService.uploadFile({
      file: thumbnailImage,
      classId: newClass?.classId,
    });

    return newClass;
  }

  @Put('/:classId')
  @UseInterceptors(FileInterceptor('thumbnailImage'))
  async updateClass(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000000 }), // 1GB
        ],
        fileIsRequired: false,
      }),
    )
    thumbnailImage: Express.Multer.File,
    @Param('classId') classId: number,
    @Body() createClassDto: CreateClassDto,
  ) {
    const updatedClass = await this.classService.updateClass(
      createClassDto,
      classId,
    );

    await this.fileService.resetFiles({ classId });

    await this.fileService.uploadFile({
      file: thumbnailImage,
      classId,
    });

    return updatedClass.raw?.[0];
  }

  @Get('/')
  getClasses() {
    return this.classService.getClasses();
  }

  @Get('/:classId')
  getClass(@Param('classId') classId: number) {
    return this.classService.getClass(classId);
  }
}
