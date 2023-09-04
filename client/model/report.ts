import { BaseEntity } from './common';
import { File } from './file';
import { User } from './user';

export const BasisCount = 42;
export const fileNames = [
  '제개정자료',
  '발표자료',
  '보고서',
  '보도자료',
  '논문자료',
];
export const fileENNames = [
  'revisedFiles',
  'presentationFiles',
  'reportFiles',
  'pressFiles',
  'paperFiles',
];

export enum CertificateState {
  NONE,
  ON_GOING,
  DONE,
}

export type Report = {
  reportId: number;

  basis: string;

  year: string;

  quarter: string;

  certificationDate: string;

  revisedFiles: File[];

  presentationFiles: File[];

  reportFiles: File[];

  pressFiles: File[];

  paperFiles: File[];

  user: User;
} & BaseEntity;

export type MutateReport = Partial<Report>;