import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/model/post.entity';
import { PostCategory } from 'src/model/postCategory.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>,
  ) {}

  createCategory(name: string) {
    return this.postCategoryRepository.insert({ name });
  }

  async getCategories() {
    const categories = this.postCategoryRepository.find();

    return (await categories).map((category) => ({
      name: category.name,
      categoryId: category.categoryId,
    }));
  }

  async getCategory(categoryId: number) {
    return this.postCategoryRepository.findOneBy({
      categoryId: categoryId,
    });
  }

  async getPosts(categoryId) {
    return this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.title',
        'p.postId',
        'p.content',
        'p.createDateTime',
        'p.viewCount',
        'p.isAnswer',
        'c.name',
        'u.name',
        'u.userId',
      ])
      .leftJoin('p.user', 'u')
      .leftJoin('p.category', 'c')
      .where(`c.categoryId = ${categoryId}`)
      .getMany();
  }

  async getPost(postId: string) {
    return this.postRepository.findOne({
      select: {
        postId: true,
        title: true,
        content: true,
        createDateTime: true,
        user: {
          name: true,
          classification: true,
        },
        category: {
          name: true,
        },
        files: true
      },
      where: {
        postId: parseInt(postId),
      },
      relations: {
        category: true,
        user: true,
        files: true,
      },
    });
  }

  async createPost(createPost: CreatePostDto & { userId: number }): Promise<number> {

    const newPost = await this.postRepository.insert({
      title: createPost.title,
      content: createPost.content,
      category: {
        categoryId: createPost.categoryId
      },
      user: {
        userId: createPost.userId
      }
    });
    return newPost.raw[0].postId;
  }
}
