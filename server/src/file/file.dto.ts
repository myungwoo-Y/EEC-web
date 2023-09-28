import { IsNotEmpty } from "class-validator";

export class FileDto {
  @IsNotEmpty()
  columnKey: string;
  @IsNotEmpty()
  idKey: string;
  @IsNotEmpty()
  id: string | number;
}