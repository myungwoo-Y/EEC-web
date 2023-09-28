import { Class } from './class';
import { BaseEntity } from './common';
import { Curriculum } from './curriculum';
import { File } from './file';
import { User } from './user';

export type Lecture = {
  lectureId: number;

  title: string;

  author: string;

  lecturer: string;

  admin: User;

  startDate: string;

  endDate: string;

  intro: string;

  lectureFiles: File[];

  referenceFiles: File[];

  lectureLink: string;

  evaluateStartDate: string;

  evaluateEndDate: string;

  evaluateLink: string;

  lecturerEvaluateStartDate: string;

  lecturerEvaluateEndDate: string;

  lecturerEvaluateLink: string;

  class?: Class;

  curriculum?: Curriculum;
} & BaseEntity;

export type NewLecture = {
  title: string;

  curriculumId: number;

  adminId: number;
};

export type UpdateLectures = { lectureId: number; title: string }[];
export type UpdateLecture = Partial<Lecture> & {adminId: string, curriculumId: number}