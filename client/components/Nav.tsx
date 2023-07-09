'use client';

import { User } from '@/../server/src/model/user.entity';
import { removeCredentials, selectCurrentUser, setCredentials } from '@/features/auth/authSlice';
import { useLazyGetUserByTokenQuery } from '@/services/auth';
import { ArrowRightOnRectangleIcon, UserIcon , UserMinusIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from './NavItem';

function Nav() {
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const [trigger] = useLazyGetUserByTokenQuery();

  useEffect(() => {
    if (!user) {
      const tokenFromLocal = localStorage.getItem('token');
      if (tokenFromLocal) {
        trigger(tokenFromLocal).then(result => {
          dispatch(setCredentials({
            token: tokenFromLocal,
            user: result.data
          }))
        });
      }
    }
  }, [trigger, user, dispatch]);

  return (
    <div className="flex w-full h-14 py-4 flex-row-reverse px-8 gap-4">
      {user ? (
        <>
          <button 
            className="flex items-center hover:text-primary"
            onClick={() => dispatch(removeCredentials())}
          >
            <UserMinusIcon className="w-4 h-4 mr-1" /> 로그아웃
          </button>
          <NavItem
            text="정보관리"
            path="/admin"
            Icon={Cog6ToothIcon}
          />
          <div className="">{`${user.name}님 환영합니다`}</div>
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

export default Nav;
