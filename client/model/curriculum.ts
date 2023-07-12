import { BaseEntity } from "@/../server/src/model/base.entity";
import ServerCurriculum from "@/../server/src/model/curriculum.entity";

export type NewCurriculum = Omit<
  ServerCurriculum,
  keyof BaseEntity | 'curriculumId'
> & { classId: number | string };


export type UpdateCurriculums = { curriculumId: number; title: string }[];