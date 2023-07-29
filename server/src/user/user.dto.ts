import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/model/user.entity';
export class CreateUserDto {
  @IsEmail()
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

export class FindByEmailDTO {
  @IsEmail()
  email: string;
}
