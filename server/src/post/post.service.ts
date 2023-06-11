import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCategory } from 'src/model/postCategory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
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
      id: category.id
    }));
  }
}
