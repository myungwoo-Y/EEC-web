import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  curriculumId: number;

  @IsNotEmpty()
  adminId: number;
}

export class UpdateLectureDto {
  @IsNotEmpty()
  curriculumId: number; 
  
  @IsNotEmpty()
  @IsString()
  title: string;
}