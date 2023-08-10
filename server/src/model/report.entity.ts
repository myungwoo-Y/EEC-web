import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import File from './file.entity';
import { User } from './user.entity';

@Entity({ name: 'report' })
export class Report extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  reportId: number;

  @Column({ type: 'text' })
  basis: string;

  @Column({ type: 'varchar', length: 50 })
  year: string;

  @Column({ type: 'varchar', length: 50 })
  quarter: string;
  
  @Column({ type: 'timestamptz', nullable: true })
  certificationDate: Date;

  @OneToMany(() => File, (file) => file.reportRevised, { cascade: true })
  revisedFiles: File[];

  @OneToMany(() => File, (file) => file.reportPresentation, { cascade: true })
  presentationFiles: File[];

  @OneToMany(() => File, (file) => file.reportReport, { cascade: true })
  reportFiles: File[];

  @OneToMany(() => File, (file) => file.reportPress, { cascade: true })
  pressFiles: File[];

  @OneToMany(() => File, (file) => file.reportPaper, { cascade: true })
  paperFiles: File[];

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user: User;
}