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
    private postCategoryRepository: Repository<PostCategory>
  ) {}


  createCategory(name: string) {
    return this.postCategoryRepository.insert({ name });
  }

  async getCategories() {
    const categories = this.postCategoryRepository.find();

    return (await categories).map(category => ({
      name: category.name,
      id: category.id,
      category_id: category.category_id
    }));
  }

  async getPosts(categoryId) {
    return this.postRepository.createQueryBuilder('p')
    .select(['p.title', 'p.id', 'p.content', 'p.createDateTime', 'p.viewCount', 'p.is_answer', 'c.name', 'u.name'])
    .leftJoin('p.user', 'u')
    .leftJoin('p.category', 'c')
    .where(`c.category_id = ${categoryId}`)
    .getMany();
  }
}
