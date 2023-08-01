import { User } from '@/model/user';
import { Certification as SCertification } from '../../server/src/model/certification.entity';

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
  Course = 'course'
}

export type CertificationHistory = NestedSwapDatesWithStrings<SCertification & User>;