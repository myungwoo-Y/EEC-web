import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Class from './class.entity';
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

  @JoinColumn({name : 'classId', referencedColumnName: 'classId'})
  @OneToOne(() => Class)
  public class?: Class;
}
 
export default File;