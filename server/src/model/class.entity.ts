import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import File from './file.entity';
 
@Entity()
class Class {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  classId: string;
 
  @Column({ type: 'varchar', length: 50 })
  title: string;
 
  @Column({ type: 'varchar', default: ''})
  description: string;

  @Column({ type: 'text', default: ''})
  detail: string;
 
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  classStart: Date;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  classEnd: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registerStart: Date;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registerEnd: Date;

  @JoinColumn({name : 'thumbnailImageId', referencedColumnName: 'fileId'})
  @OneToOne(() => File)
  thumbnailImage: File;
}
 
export default Class;