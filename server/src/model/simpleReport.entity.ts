import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

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