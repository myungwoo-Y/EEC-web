import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/model/user.entity";

export const HasRoles = (...role: UserRole[]) => SetMetadata('roles', role);
