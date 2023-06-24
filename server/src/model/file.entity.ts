import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
 
@Entity()
class File {
  @PrimaryGeneratedColumn('uuid')
  fileId: string;
 
  @Column()
  filename: string;
 
  @Column()
  path: string;
 
  @Column()
  mimetype: string;

  @JoinColumn({name : 'postId', referencedColumnName: 'postId'})
  @ManyToOne(() => Post)
  public post?: Post;
}
 
export default File;