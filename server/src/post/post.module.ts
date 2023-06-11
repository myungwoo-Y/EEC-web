import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategory } from 'src/model/postCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostCategory]),
  ],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
