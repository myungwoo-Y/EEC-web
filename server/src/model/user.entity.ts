import { Column, CreateDateColumn, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column({ type: 'varchar', length: 10 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  classification: string;

  @Column({ type: 'varchar', length: 50 })
  phone_number: string;

  @CreateDateColumn({ type: 'timestamptz' })
  birthday: Date;

  @Column({ type: 'varchar', length: 50 })
  department: string;

  @Column({ type: 'varchar', length: 50 })
  job_level: string;

  @Column({ type: 'varchar', length: 50 })
  class_order: string;

  @Column({ type: 'boolean', default: true })
  agreement_terms: boolean;
}