import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
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

  @Column({ type: 'boolean', default: false})
  is_answer: boolean;

  @Column({ type: 'boolean', default: true})
  is_open: boolean;

  @OneToOne((type) => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne((type) => PostCategory)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: PostCategory;

  @Column({ type: 'integer'})
  @Generated('increment')
  post_id: number;
}