import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './post.dto';
import FileService from 'src/file/file.service';
import { writeFile, mkdirSync } from 'fs';
import { join } from 'path';

@Controller()
export class PostsController {
  constructor(
    private postService: PostService,
    private fileService: FileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/category')
  createCategory(@Body() body) {
    return this.postService.createCategory(body.name);
  }

  @Get('/categories')
  getCategories() {
    return this.postService.getCategories();
  }

  @Get('/categories/:categoryId')
  getCategorie(@Param('categoryId') categoryId) {
    return this.postService.getCategory(categoryId);
  }

  @Get('/posts?')
  getPosts(@Query('categoryId') categoryId: string) {
    return this.postService.getPosts(categoryId);
  }

  @Get('/posts/:postId')
  getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/post')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000000 }), // 1GB
        ],
        fileIsRequired: false,
      }),
    )
    files: Array<Express.Multer.File>,
    @Req() req,
    @Body() createPostDto: CreatePostDto,
  ) {
    const postId = await this.postService.createPost({
      ...createPostDto,
      userId: req.user?.userId,
    });

    files.map(async (file) => {
      const fileName = Buffer.from(file.originalname, 'latin1').toString();
      const newFilePath = `/upload/${postId}/`;
      await mkdirSync(join(process.cwd(), `/upload/${postId}`), {
        recursive: true,
      });
      writeFile(join(process.cwd(), newFilePath + fileName), file.buffer, (err) => {
        if (err) {
          console.log(err);
        }
      });
      this.fileService.saveLocalFileData({
        filename: fileName,
        mimetype: file.mimetype,
        path: `/${postId}/${encodeURIComponent(fileName)}`,
        postId: postId,
      });
    });

    return { postId };
  }
}
