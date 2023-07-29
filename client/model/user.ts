import { User as SUser } from "@/../server/src/model/user.entity";

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  LECTURER = "lecturer"
}

export type User = Omit<SUser, 'classOrder' | 'role'> & {
  classOrder: number | string;
  role: string;
}

export type CreateUser = Partial<User>

export type UpdateUser = Partial<User>

export type UpdateRegisterStatus = {
  userId: number;
  isActive: boolean;
  role: UserRole | string;
}

export const UserRoles = [UserRole.STUDENT, UserRole.LECTURER,UserRole.ADMIN];
