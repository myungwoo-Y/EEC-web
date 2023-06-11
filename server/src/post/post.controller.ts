import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt-auth.guard';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
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
}
