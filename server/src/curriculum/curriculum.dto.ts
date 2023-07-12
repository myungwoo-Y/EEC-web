import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateCurriculumDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  classOrder: number;

  @IsNotEmpty()
  classId: number;
}

export class UpdateCurriculumDto {
  @IsNotEmpty()
  curriculumId: number; 
  
  @IsNotEmpty()
  @IsString()
  title: string;
}