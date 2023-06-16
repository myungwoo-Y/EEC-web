import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { PostService } from './post.service';

@Controller('posts')
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

  @Get('/:categoryId')
  getPosts(@Param('categoryId') categoryId: string) {
    return this.postService.getPosts(categoryId);
  }
}
