import { Application } from './application';
import { Certification } from './certification';
import { BaseEntity } from './common';
import { Lecture } from './lecture';
import { Report } from './report';

export enum UserRole {
  ADMIN = 'admin',
  STUDENT = 'student',
  LECTURER = 'lecturer',
}

export type User = {
  userId: number;

  email: string;

  password: string;

  name: string;

  role: UserRole;

  phoneNumber: string;

  birthday: string;

  department: string;

  jobLevel: string;

  classOrder: number;

  agreementTerms: boolean;

  lectures: Lecture[];

  certifications: Certification[];

  applications: Application[];

  comments: Comment[];

  reports: Report[];

  memo: string;

  lastLogin: string;
} & BaseEntity


export type CreateUser = Partial<Omit<User, 'role' | 'classOrder'> & { role: string, classOrder: string | number}>;

export type UpdateUser = Partial<Omit<User, 'role' | 'classOrder'> & { role: string, classOrder: string | number}>;

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

export const defaultBirthday = '00-01-01';
