import { CreateLectureDto } from "@/../server/src/lecture/lecture.dto";
import ServerLecture from "@/../server/src/model/lecture.entity";

export type Lecture = NestedSwapDatesWithStrings<ServerLecture>;
export type NewLecture = CreateLectureDto;

export type UpdateLectures = { lectureId: number; title: string }[];