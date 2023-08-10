import { IsNotEmpty } from "class-validator";

export class CreateReportDto {
  @IsNotEmpty()
  quarter: string;

  @IsNotEmpty()
  basis: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  certificationDate: string;
}