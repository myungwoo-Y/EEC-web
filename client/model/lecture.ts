import { BaseEntity } from "@/../server/src/model/base.entity";
import ServerLecture from "@/../server/src/model/lecture.entity";

export type Lecture = NestedSwapDatesWithStrings<ServerLecture>;
export type NewLecture = Omit<Lecture, keyof BaseEntity>;