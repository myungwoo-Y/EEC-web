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
import { HasRoles } from 'src/auth/has-role.decorator';
import { UserRole } from 'src/model/user.entity';
import { RoleGuard } from 'src/auth/role.guard';

@Controller()
export class PostsController {
  constructor(
    private postService: PostService,
    private fileService: FileService,
  ) {}

  @HasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/category')
  createCategory(@Body() body) {
    return this.postService.createCategory(body.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/categories')
  getCategories() {
    return this.postService.getCategories();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/categories/:categoryId')
  getCategorie(@Param('categoryId') categoryId) {
    return this.postService.getCategory(categoryId);
  }

  @Get('/posts?')
  getPosts(@Query('categoryId') categoryId: string) {
    return this.postService.getPosts(categoryId);
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put('/post/answer/:postId')
  async answerPost(@Param('postId') postId: number) {
    return this.postService.answerPost(postId);
  }

  @Put('/post/viewcount/:postId')
  async updateViewCount(@Param('postId') postId: number) {
    return this.postService.updatePostViewCount(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/post/:postId')
  deletePost(@Param('postId') postId: number) {
    return this.postService.deletePost(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/comment')
  createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.postService.createComment(createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/comment/content')
  updateContentInComment(@Body() updateCommentDto: UpdateCommentDto) {
    return this.postService.updateContentInComment(updateCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/comment/:commentId')
  deleteComment(@Param('commentId') commentId: string) {
    return this.postService.deleteComment(commentId);
  }
}
