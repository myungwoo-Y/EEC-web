import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/model/post.entity';
import { PostCategory } from 'src/model/postCategory.entity';
import { Repository } from 'typeorm';

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
      id: category.id,
      category_id: category.category_id,
    }));
  }

  async getCategory(categoryId: string) {
    return this.postCategoryRepository.findOneBy({
      category_id: parseInt(categoryId)
    });
  }

  async getPosts(categoryId) {
    return this.postRepository
      .createQueryBuilder('p')
      .select([
        'p.title',
        'p.id',
        'p.content',
        'p.createDateTime',
        'p.viewCount',
        'p.is_answer',
        'p.post_id',
        'c.name',
        'u.name',
        'u.id',
      ])
      .leftJoin('p.user', 'u')
      .leftJoin('p.category', 'c')
      .where(`c.category_id = ${categoryId}`)
      .getMany();
  }

  async getPost(postId: string) {
    return this.postRepository.findOne({
      select: {
        id: true,
        title: true,
        content: true,
        createDateTime: true,
        user: {
          name: true,
          classification: true,
        },
        category: {
          name: true
        },
      },
      where: {
        post_id: parseInt(postId)
      },
      relations: {
        category: true,
        user: true
      }
    });
  }
}
