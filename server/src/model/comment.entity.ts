import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @Column({ type: 'varchar', length: 500 })
  content: string;

  @ManyToOne((type) => User, (user) => user.comments, {
    cascade: true,
  })
  user: User;

  @ManyToOne((type) => Post, (post) => post.comments, { cascade: true })
  post: Post;
}
