import { User } from '@/model/user';
import { BaseEntity } from './common';

export type Certification = {
  issueNumber: string;
  startDate: string;
  endDate: string;
  title: string;
  certificationDate: string;
  type: CertificationType;
};

export enum CertificationType {
  Normal = 'normal',
  Course = 'course',
}

export type CertificationHistory = {
  certificationId: number;

  title: string;

  issueNumber: number;

  description: string;

  type: CertificationType;

  startDate: string;

  endDate: string;

  certificationDate: string;
} & User &
  BaseEntity;
