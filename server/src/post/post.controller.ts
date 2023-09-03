import {
  Body,
  Controller,
  Delete,
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
import { CreateCommentDto, CreatePostDto, UpdateCommentDto, UpdatePostDto } from './post.dto';
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
  async createPost(
    @Req() req,
    @Body() createPostDto: CreatePostDto,
  ) {
    const postId = await this.postService.createPost({
      ...createPostDto,
      userId: req.user?.userId,
    });

    return { postId };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/post/:postId')
  async updatePost(
    @Req() req,
    @Param('postId') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    await this.postService.updatePost({
      ...updatePostDto,
      userId: req.user?.userId,
    });
    
    return { postId };
  }

  @Put('/post/answer/:postId')
  async answerPost(@Param('postId') postId: number) {
    return this.postService.answerPost(postId);
  }

  @Put('/post/viewcount/:postId')
  async updateViewCount(@Param('postId') postId: number) {
    return this.postService.updatePostViewCount(postId);
  }

  @Delete('/post/:postId')
  deletePost(@Param('postId') postId: number) {
    return this.postService.deletePost(postId);
  }

  @Post('/comment')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.postService.createComment(createCommentDto);
  }

  @Put('/comment/content')
  updateContentInComment(@Body() updateCommentDto: UpdateCommentDto) {
    return this.postService.updateContentInComment(updateCommentDto);
  }

  @Delete('/comment/:commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.postService.deleteComment(commentId);
  }
}
