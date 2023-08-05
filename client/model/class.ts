import { Curriculum } from './curriculum';
import { Lecture } from './lecture';
import { Application } from './application';
import { File } from './file';
import { BaseEntity } from './common';
export type NewClass = Omit<Class, keyof BaseEntity | 'thumbnailImage'> & {
  thumbnailImage: File;
};

export type Class = {
  classId: number;

  title: string;

  target: string;

  description: string;

  detail: string;

  classStart: string;

  classEnd: string;

  registerStart: string;

  registerEnd: string;

  thumbnailImage: File;

  curriculums: Curriculum[];

  lectures: Lecture[];

  applications: Application[];
} & BaseEntity;
