import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostsController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCategory } from 'src/model/postCategory.entity';
import { Post } from 'src/model/post.entity';
import { MulterModule } from '@nestjs/platform-express';
import FileService from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';
import File from 'src/model/file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostCategory, File]),
    FileModule,
    MulterModule.register({
      dest: './upload',
    })
  ],
  providers: [PostService, FileService],
  controllers: [PostsController]
})
export class PostModule {}
