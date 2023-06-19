import { Body, Controller, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class PostsController {
  constructor(
    private postService: PostService
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
  uploadFile(@UploadedFiles(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1000000000 }), // 1GB
      ],
    }),
  ) files: Array<Express.Multer.File>, @Req() req) {
    console.log(files);
    console.log(req.user);
  }
}
