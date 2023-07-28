import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import Lecture from "./lecture.entity";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  LECTURER = "lecturer"
}


@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  userId: number

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.STUDENT
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

  @OneToMany((type) => Lecture, (lecture) => lecture.admin)
  lectures: Lecture[]
}