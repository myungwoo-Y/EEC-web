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
  lectureId: number; 
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  curriculumId: number;

  @IsNotEmpty()
  adminId: number;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsNotEmpty()
  @IsString()
  lecturer: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;
  
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;
  
  @IsNotEmpty()
  @IsString()
  intro: string;
  
  @IsNotEmpty()
  @IsString()
  lectureLink: string;

  @IsNotEmpty()
  @IsDateString()
  evaluateStartDate: Date;

  @IsNotEmpty()
  @IsDateString()
  evaluateEndDate: Date;

  @IsNotEmpty()
  @IsString()
  evaluateLink: string;

  @IsNotEmpty()
  @IsDateString()
  lecturerEvaluateStartDate: Date;

  @IsNotEmpty()
  @IsDateString()
  lecturerEvaluateEndDate: Date;

  @IsNotEmpty()
  @IsString()
  lecturerEvaluateLink: string;
}