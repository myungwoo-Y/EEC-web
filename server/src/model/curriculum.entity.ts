import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import Class from './class.entity';
 
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
  @ManyToOne(() => Class, (classData) => classData.thumbnailImage, {
    onDelete: 'CASCADE',
  })
  public class?: Class;
}
 
export default Curriculum;