import { CertificationType } from './../model/certification.entity';
import { IsNotEmpty } from "class-validator";
import { User } from "src/model/user.entity";

export class CreateCertificationDto extends User {
  @IsNotEmpty()
  issueNumber: number;
  
  @IsNotEmpty()
  startDate: string;
  
  @IsNotEmpty()
  endDate: string;
  
  @IsNotEmpty()
  title: string;
  
  @IsNotEmpty()
  certificationDate: string;

  @IsNotEmpty()
  type: CertificationType;
}

export class DeleteUserInCertificationDto {
  @IsNotEmpty()
  certificationId: number;

  @IsNotEmpty()
  userId: number;
} 