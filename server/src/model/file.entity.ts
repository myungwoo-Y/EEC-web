import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import Class from './class.entity';
import Lecture from './lecture.entity';
import { Post } from './post.entity';
import { Report } from './report.entity';

@Entity('file')
class File extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  fileId: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  @ManyToOne(() => Post, {
    onDelete: 'CASCADE'
  })
  public post?: Post;

  @JoinColumn({ name: 'classId', referencedColumnName: 'classId' })
  @OneToOne(() => Class, (classData) => classData.thumbnailImage, {
    onDelete: 'CASCADE',
  })
  public class?: Class;

  @ManyToOne(() => Lecture, (lecture) => lecture.lectureFiles, {
    onDelete: 'CASCADE',
  })
  lecture: Lecture;


  @ManyToOne(() => Lecture, (lecture) => lecture.referenceFiles, {
    onDelete: 'CASCADE',
  })
  lectureWithReference: Lecture;

  @ManyToOne(() => Report, (report) => report.revisedFiles, {
    onDelete: 'CASCADE',
  })
  reportRevised: Report;

  @ManyToOne(() => Report, (report) => report.presentationFiles, {
    onDelete: 'CASCADE',
  })
  reportPresentation: Report;

  @ManyToOne(() => Report, (report) => report.reportFiles, {
    onDelete: 'CASCADE',
  })
  reportReport: Report;

  @ManyToOne(() => Report, (report) => report.pressFiles, {
    onDelete: 'CASCADE',
  })
  reportPress: Report;

  @ManyToOne(() => Report, (report) => report.paperFiles, {
    onDelete: 'CASCADE',
  })
  reportPaper: Report;
}

export default File;
