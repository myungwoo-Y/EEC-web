import { Column, Entity, JoinColumn, JoinTable, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PostCategory } from './postCategory.entity';
import { User } from './user.entity';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'integer', default: 0 })
  viewCount: number;

  @OneToOne((type) => User)
  @JoinTable()
  user: User;

  @OneToOne((type) => PostCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: PostCategory;
}