import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategory } from 'src/model/postCategory.entity';
import { Post } from 'src/model/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostCategory]),
  ],
  providers: [PostService],
  controllers: [PostsController]
})
export class PostModule {}