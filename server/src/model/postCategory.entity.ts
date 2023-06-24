import { Column, Entity, Generated, JoinTable, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: 'post_category' })
export class PostCategory extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  categoryId: number
  
  @Column({ type: 'varchar', length: 50})
  name: string
}