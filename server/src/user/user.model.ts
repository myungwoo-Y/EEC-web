import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  classification: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  department: string;

  @IsNotEmpty()
  job_level: string;

  @IsNotEmpty()
  class_order: string;  

  @IsBoolean()
  agreement_terms: boolean;
}

export class FindByEmailDTO {
  @IsEmail()
  email: string;
}
