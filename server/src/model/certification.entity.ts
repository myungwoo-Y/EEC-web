import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

export enum CertificationType {
  Normal = 'normal',
  Course = 'course'
}

@Entity('certification')
export class Certification extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  certificationId: number;
 
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 100 })
  issueNumber: number;
 
  @Column({ type: 'varchar', default: ''})
  description: string;

  @Column({ type: 'varchar', default: CertificationType.Normal})
  type: CertificationType;
 
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;
  
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  endDate: Date;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  certificationDate: Date;

  @ManyToMany(() => User, (user) => user.certifications)
  @JoinTable()
  users: User[];
}
 
export default Certification;