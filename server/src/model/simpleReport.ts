import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import File from './file.entity';
import { User } from './user.entity';

@Entity({ name: 'simple_report' })
export class SimpleReport extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  simpleReportId: number;

  @Column({ type: 'varchar', length: 100 })
  title: string;
  
  @Column({ type: 'timestamptz', nullable: true })
  submitDate: Date;
}