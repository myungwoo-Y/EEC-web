import { Certification } from './certification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import Lecture from './lecture.entity';
import { Application } from './application.entity';
import { Comment } from './comment.entity';
import { Report } from './report.entity';
import { SimpleReport } from './simpleReport.entity';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  LECTURER = 'lecturer',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'integer' })
  @PrimaryGeneratedColumn('increment')
  userId: number;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 50, default: '' })
  phoneNumber: string;

  @CreateDateColumn({ type: 'timestamptz' })
  birthday: Date;

  @Column({ type: 'varchar', length: 50, default: '' })
  department: string;

  @Column({ type: 'varchar', length: 50, default: '' })
  jobLevel: string;

  @Column({ type: 'integer', default: 1 })
  classOrder: number;

  @Column({ type: 'boolean', default: true })
  agreementTerms: boolean;

  @Column({ type: 'varchar', length: 500, default: '' })
  memo: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastLogin: Date;

  @OneToMany((type) => Lecture, (lecture) => lecture.admin)
  lectures: Lecture[];

  @ManyToMany(() => Certification, (certification) => certification.users, {
    cascade: true,
  })
  certifications: Certification[];

  @OneToMany((type) => Application, (application) => application.user)
  applications: Application[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Report, (report) => report.user)
  reports: Report[];

  @OneToOne(() => SimpleReport)
  @JoinColumn()
  public simpleReport?: SimpleReport;
}

export type AuthUser = Omit<User, 'password'>;
