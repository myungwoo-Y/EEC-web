import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  target: string;

  @IsNotEmpty()
  @IsString()
  detail: string;

  @IsNotEmpty()
  @IsDateString()
  classStart: Date;
  
  @IsNotEmpty()
  @IsDateString()
  classEnd: Date;
  
  @IsNotEmpty()
  @IsDateString()
  registerStart: Date;
  
  @IsNotEmpty()
  @IsDateString()
  registerEnd: Date;
}