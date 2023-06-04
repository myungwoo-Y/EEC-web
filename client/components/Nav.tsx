'use client';

import { selectCurrentUser } from '@/features/auth/authSlice';
import { ArrowRightOnRectangleIcon, UserIcon , UserMinusIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';

function Nav() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="flex w-full h-14 py-4 flex-row-reverse px-8">
      {user ? (
        <>
          <NavItem text="로그아웃" path="/" Icon={UserMinusIcon}/>
          <div className="mr-4">
            {`${user.name}님 환영합니다`}
          </div>
        </>
      ) : (
        <>
          <NavItem text="로그인" path="/login" Icon={ArrowRightOnRectangleIcon}/>
          <NavItem text="회원가입" path="/signup" className="mr-4" Icon={UserIcon} />
        </>
      )}
    </div>
  );
}

export default Nav;
