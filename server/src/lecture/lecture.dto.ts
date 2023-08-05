import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateLectureDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  curriculumId: number;

  @IsNotEmpty()
  adminId: number;
}


export class SimpleUpdateLectureDto {
  @IsNotEmpty()
  lectureId: number; 
  
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class UpdateLectureDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  curriculumId: number;

  @IsNotEmpty()
  adminId: number;

  author: string;

  lecturer: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
  
  intro: string;
  
  lectureLink: string;

  evaluateStartDate: Date;

  evaluateEndDate: Date;

  evaluateLink: string;

  lecturerEvaluateStartDate: Date;

  lecturerEvaluateEndDate: Date;

  lecturerEvaluateLink: string;
}