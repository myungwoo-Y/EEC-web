import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import Class from './class.entity';
import Lecture from './lecture.entity';
 
@Entity('curriculum')
class Curriculum extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  curriculumId: number;
 
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'integer', default: 1 })
  classOrder: number;
  
  @JoinColumn({ name: 'classId', referencedColumnName: 'classId' })
  @ManyToOne(() => Class, (classData) => classData.curriculums, {
    onDelete: 'CASCADE',
  })
  public class?: Class;

  @OneToMany((type) => Lecture, (lecture) => lecture.curriculum)
  lectures: Lecture[];
}
 
export default Curriculum;