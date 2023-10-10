import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from 'src/model/user.entity';
export class CreateUserDto {
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: UserRole;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  jobLevel: string;

  @IsNotEmpty()
  classOrder: number;

  @IsBoolean()
  agreementTerms: boolean;
}

export class UpdateUserDto {
  userId: number;

  password: string;

  name: string;

  phoneNumber: string;

  birthday: Date;

  department: string;

  jobLevel: string;

  classOrder: number;

  agreementTerms: boolean;
}

export class FindByEmailDTO {
  @IsString()
  email: string;
}

export class UpdateClassToUserDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  classId: number;
}

export class UpdateSimpleReportDto {
  simpleReportId: number;

  title: string;

  submitDate: Date;
}