import { Class } from "./class";
import { BaseEntity } from "./common";
import { Lecture } from "./lecture";

export type NewCurriculum = Partial<Omit<
Curriculum,
  keyof BaseEntity | 'curriculumId'
> & { classId: number | string }>;

export type UpdateCurriculums = { curriculumId: number; title: string }[];

export type Curriculum = {
  curriculumId: number;
 
  title: string;

  classOrder: number;
  
  class?: Class;

  lectures: Lecture[];
} & BaseEntity;