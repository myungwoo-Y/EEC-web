import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import Class from './class.entity';
import { User } from './user.entity';
 
@Entity('application')
export class Application extends BaseEntity {
  @Column({ type: 'integer'})
  @PrimaryGeneratedColumn('increment')
  applicationId: number;
 
  @Column({ type: 'integer', default: 1 })
  classOrder: number;
  
  @ManyToOne(() => Class, () => null, {
    onDelete: 'CASCADE',
  })
  public class?: Class;

  @ManyToOne(() => User, () => null, {
    onDelete: 'CASCADE',
  })
  public user?: User;

}