import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import FileService from 'src/file/file.service';
import { Comment } from 'src/model/comment.entity';
import { Post } from 'src/model/post.entity';
import { PostCategory } from 'src/model/postCategory.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto, CreatePostDto, UpdateCommentDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(PostCategory)
    private postCategoryRepository: Repository<PostCategory>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private fileService: FileService,
  ) {}

  createCategory(name: string) {
    return this.postCategoryRepository.insert({ name });
  }

  async getCategories() {
    const categories = await this.postCategoryRepository.find();

    return categories.map((category) => ({
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
      .orderBy('p.createDateTime', 'DESC')
      .getMany();
  }

  async getPost(postId: string) {
    return this.postRepository.findOne({
      select: {
        postId: true,
        title: true,
        content: true,
        createDateTime: true,
        isOpen: true,
        isAnswer: true,
        user: {
          name: true,
          role: true,
          userId: true,
        },
        category: {
          name: true,
          categoryId: true,
        },
        comments: true,
        files: true
      },
      where: {
        postId: parseInt(postId),
      },
      relations: {
        category: true,
        user: true,
        files: true,
        comments: {
          user: true
        },
      },
      order: {
        comments: {
          createDateTime: 'ASC'
        }
      }
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

    await Promise.all(createPost.files.map((file) => {
      this.fileService.linkFileToParent({
        fileId: file.fileId,
        parentColumnName: 'post',
        parentIdName: 'postId',
        parentId: newPost.raw[0].postId,
      });
    }));

    return newPost.raw[0].postId;
  }

  async updatePost(updatePost: UpdatePostDto & { userId: number }) {
    const { postId, files } = updatePost;

    await this.postRepository.update(updatePost.postId, {
      title: updatePost.title,
      content: updatePost.content,
    });
    
    await this.fileService.unlinkFiles({
      parentColumnName: 'post',
      parentIdName: 'postId',
      parentId: postId,
    });

    await Promise.all(files.map(async (file) => {

      await this.fileService.linkFileToParent({
        fileId: file.fileId,
        parentColumnName: 'post',
        parentIdName: 'postId',
        parentId: postId,
      });
    }));
  }

  async updatePostViewCount(postId: number) {
    const { viewCount } = await this.postRepository.findOneBy({postId});
    await this.postRepository.update({
      postId
    }, {
      viewCount: viewCount + 1
    });
  }

  async answerPost(postId: number) {
    await this.postRepository.update({
      postId
    }, {
      isAnswer: true
    });
  }

  async deletePost(postId: number) {
    await this.postRepository.delete(postId);
  }

  async updateContentInComment(updateCommentDto: UpdateCommentDto) {
    const { content, commentId } = updateCommentDto;
    return this.commentRepository.update(commentId, {
      content
    });
  }

  async deleteComment(commentId: string) {
    return this.commentRepository.delete(commentId);
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const { userId, postId, content } = createCommentDto;
    return this.commentRepository.insert({
      content,
      user: {
        userId 
      },
      post: {
        postId
      }
    });
  }
}
