import { IsNotEmpty } from 'class-validator';
import File from 'src/model/file.entity';

export class CreateReportDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  quarter: string;

  @IsNotEmpty()
  basis: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  certificationDate: string;

  revisedFiles: File[];
  presentationFiles: File[];
  reportFiles: File[];
  pressFiles: File[];
  paperFiles: File[];
}

export class UpdateReportDto {
  @IsNotEmpty()
  quarter: string;

  @IsNotEmpty()
  basis: string;

  @IsNotEmpty()
  year: string;

  @IsNotEmpty()
  certificationDate: string;

  revisedFiles: File[];
  presentationFiles: File[];
  reportFiles: File[];
  pressFiles: File[];
  paperFiles: File[];
}
