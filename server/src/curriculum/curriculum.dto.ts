import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateCurriculumDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  classOrder: number;

  @IsNotEmpty()
  classId: number;
}