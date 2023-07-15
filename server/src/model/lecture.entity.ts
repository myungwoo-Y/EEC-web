import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import Class from './class.entity';
import Curriculum from './curriculum.entity';
import File from './file.entity';
import { User } from './user.entity';
 
@Entity('lecture')
class Lecture extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  lectureId: number;
 
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'varchar', length: 50 })
  author: string;

  @Column({ type: 'varchar', length: 50 })
  lecturer: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'adminId', referencedColumnName: 'userId' })
  admin: User;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @Column({ type: 'varchar', length: 1000 })
  intro: string;
  
  @OneToMany(() => File, (file) => file.lecture)
  lecturefiles: File[]

  @OneToMany(() => File, (file) => file.lecture)
  referenceFiles: File[]

  @Column({ type: 'varchar', length: 2048 })
  lectureLink: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  evaluateStartDate: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  evaluateEndDate: Date;

  @Column({ type: 'varchar', length: 2048 })
  evaluateLink: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lecturerEvaluateStartDate: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lecturerEvaluateEndDate: Date;

  @Column({ type: 'varchar', length: 2048 })
  lecturerEvaluateLink: string;

  @JoinColumn({ name: 'classId', referencedColumnName: 'classId' })
  @ManyToOne(() => Class, (classData) => classData.lectures, {
    onDelete: 'CASCADE',
  })
  public class?: Class;

  @JoinColumn({ name: 'curriculumId', referencedColumnName: 'curriculumId' })
  @ManyToOne(() => Curriculum, (curriculum) => curriculum.lectures, {
    onDelete: 'CASCADE',
  })
  public curriculum?: Curriculum;
}
 
export default Lecture;