import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Application } from './application.entity';
import { BaseEntity } from './base.entity';
import Curriculum from './curriculum.entity';
import File from './file.entity';
import Lecture from './lecture.entity';
import { User } from './user.entity';
 
@Entity('class')
class Class extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  classId: number;
 
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  target: string;
 
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

  @OneToOne(() => File, (file) => file.class , {
    cascade: true,
  })
  thumbnailImage: File;

  @OneToMany((type) => Curriculum, (curriculum) => curriculum.class)
  curriculums: Curriculum[];

  @OneToMany((type) => Lecture, (lecture) => lecture.class)
  lectures: Lecture[];

  @OneToMany((type) => Application, (application) => application.class)
  applications: Application[];
}
 
export default Class;