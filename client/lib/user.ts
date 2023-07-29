import { UserRole } from '@/model/user';

export function getUserName(role: UserRole | string | undefined) {
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
