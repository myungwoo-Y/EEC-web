import { CertificationType } from '@/model/certification';
import { User, UserRole } from '@/model/user';

export function getUserRoleName(role: UserRole | string | undefined) {
  if (!role) {
    return '수강생';
  }

  switch (role) {
    case UserRole.ADMIN: {
      return '관리자';
    }
    case UserRole.LECTURER: {
      return '강사';
    }
    default: {
      return '수강생';
    }
  }
}


export function filterExisting(updatedUser: Partial<User>, originUser: User | null): Partial<User> {
  if (!originUser) {
    return updatedUser;
  }
  
  const keys = Object.keys(updatedUser) as (keyof Partial<User>)[];
  return keys.reduce((obj: Partial<User>, key) => {
    if (originUser[key] !== updatedUser[key] && updatedUser[key]) {
      return {
        [key]: updatedUser[key],
        ...obj
      };
    }
    return obj;
  }, {});
}

export function getCertificationName(type: CertificationType) {
  if (type === CertificationType.Course) {
    return '이수증';
  }
  return '수료증';
}