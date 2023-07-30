export type Certification = {
  issueNumber: string;
  startDate: string;
  endDate: string;
  title: string;
  certificationDate: string;
};

export enum CertificationType {
  Normal = 'normal',
  Course = 'course'
}