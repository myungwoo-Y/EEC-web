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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import FileService from 'src/file/file.service';
import { CreateClassDto } from './class.dto';
import { ClassService } from './class.service';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { HasRoles } from 'src/auth/has-role.decorator';
import { UserRole } from 'src/model/user.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('class')
export class ClassController {
  constructor(
    private fileService: FileService,
    private classService: ClassService,
  ) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
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
    
    await this.fileService.uploadFile({
      file: thumbnailImage,
      classId: newClass?.classId,
    });

    return newClass;
  }

  @HasRoles(UserRole.ADMIN, UserRole.LECTURER)
  @UseGuards(JwtAuthGuard, RoleGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getClasses() {
    return this.classService.getClasses();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:classId')
  getClass(@Param('classId') classId: number) {
    return this.classService.getClass(classId);
  }
}
