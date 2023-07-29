import { User as SUser } from "@/../server/src/model/user.entity";

export type User = Omit<SUser, 'classOrder' | 'role'> & {
  classOrder: number | string;
  role: string;
}

export type CreateUser = Partial<User>

export enum UserType {

}

export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  LECTURER = "lecturer"
}