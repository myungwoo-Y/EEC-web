import { Column, Entity, Generated, JoinTable, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: 'post_category' })
export class PostCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 50})
  name: string

  @Column({ type: 'integer'})
  @Generated('increment')
  category_id: number
}