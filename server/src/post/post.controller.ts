import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import FileService from 'src/file/file.service';

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
  async createPost(
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

    files.map((file) => {
      this.fileService.uploadFile({file, postId});
    });

    return { postId };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/post/:postId')
  @UseInterceptors(FilesInterceptor('files'))
  async updatePost(
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
    @Param('postId') postId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    await this.postService.updatePost({
      ...updatePostDto,
      userId: req.user?.userId,
    });

    await this.fileService.removeFilesById({ postId: parseInt(postId) });

    files.map((file) => {
      this.fileService.uploadFile({
        file,        
        postId,
      });
    });

    return { postId };
  }
}
