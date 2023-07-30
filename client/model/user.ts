import { User as SUser } from '@/../server/src/model/user.entity';
import { Certification } from './certification';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  LECTURER = 'lecturer',
}

export type User = Omit<SUser, 'classOrder' | 'role'> & {
  classOrder: number | string;
  role: string;
};

export type CreateUser = Partial<User>;

export type UpdateUser = Partial<User>;

export type UpdateRegisterStatus = {
  userId: number;
  isActive: boolean;
  role: UserRole | string;
};

export type CheckedUser = User & { checked: boolean };

export type CertificationUser = User & {
  checked: boolean;
} & Certification;

export const UserRoles = [UserRole.STUDENT, UserRole.LECTURER, UserRole.ADMIN];
