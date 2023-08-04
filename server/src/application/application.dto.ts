import { IsNotEmpty } from "class-validator";

export class UpdateApplicationActivation {
  @IsNotEmpty()
  applicationId: number;

  @IsNotEmpty()
  isActivate: boolean;
}