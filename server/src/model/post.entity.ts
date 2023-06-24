import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import File from './file.entity';
import { PostCategory } from './postCategory.entity';
import { User } from './user.entity';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  postId: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'integer', default: 0 })
  viewCount: number;

  @Column({ type: 'boolean', default: false})
  isAnswer: boolean;

  @Column({ type: 'boolean', default: true})
  isOpen: boolean;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne((type) => PostCategory)
  @JoinColumn({ name: 'categoryId', referencedColumnName: 'categoryId' })
  category: PostCategory;

  @OneToMany(() => File, (file) => file.post)
  files: File[]
}