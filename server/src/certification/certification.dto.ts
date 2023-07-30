import { IsNotEmpty } from "class-validator";
import { User } from "src/model/user.entity";

export enum CertificationType {
  Normal = 'normal',
  Course = 'course'
}

export class CreateCertificationDto extends User {
  @IsNotEmpty()
  issueNumber: string;
  
  @IsNotEmpty()
  startDate: string;
  
  @IsNotEmpty()
  endDate: string;
  
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  certificationDate: string;
}