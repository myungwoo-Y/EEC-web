import { Class } from './class';
import { BaseEntity } from './common';
import { Lecture } from './lecture';
import { Post } from './post';

export type File = {
  fileId: string;

  filename: string;

  path: string;

  mimetype: string;

  post?: Post;

  class?: Class;

  lecture: Lecture;

  lectureWithReference: Lecture;
} & BaseEntity;

export type FileMeta = {
  columnKey: string;
  idKey: string;
  id: string | number;
}
