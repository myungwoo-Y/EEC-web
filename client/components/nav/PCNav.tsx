'use client';

import { removeCredentials } from '@/features/auth/authSlice';
import { User, UserRole } from '@/model/user';
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  UserCircleIcon,
  UserIcon,
  UserMinusIcon,
} from '@heroicons/react/24/outline';
import React from 'react';
import NavItem from '../NavItem';
import { getUserRoleName } from '@/lib/user';
import useLogout from '@/hooks/useLogout';

type PCNavProps = {
  user: User | null;
};

function PCNav({ user }: PCNavProps) {
  const handleLogout = useLogout();

  return (
    <div className="flex w-full h-14 py-4 flex-row-reverse px-8 gap-4">
      {user ? (
        <>
          <button
            className="flex items-center hover:text-primary"
            onClick={handleLogout}
          >
            <UserMinusIcon className="w-4 h-4 mr-1" /> 로그아웃
          </button>
          <NavItem text="정보수정" path="/update" Icon={PencilSquareIcon} />
          {user?.role === UserRole.ADMIN && (
            <NavItem text="서비스관리" path="/admin" Icon={Cog6ToothIcon} />
          )}

          <div className="flex items-center">
            <UserCircleIcon className="w-4 h-4 mr-1" />
            {`${user.name}(${getUserRoleName(user.role)})님, 환영합니다`}
          </div>
        </>
      ) : (
        <>
          <NavItem
            text="로그인"
            path="/login"
            Icon={ArrowRightOnRectangleIcon}
          />
          <NavItem
            text="회원가입"
            path="/signup"
            className=""
            Icon={UserIcon}
          />
        </>
      )}
    </div>
  );
}

export default PCNav;
