'use client';

import { removeCredentials, selectCurrentUser, setCredentials, setUser } from '@/features/auth/authSlice';
import { getUserRoleName } from '@/lib/user';
import { useLazyGetUserByTokenQuery } from '@/services/auth';
import { ArrowRightOnRectangleIcon , PencilSquareIcon, UserCircleIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from './NavItem';
import { useGetUserQuery } from '@/services/user';

function Nav() {
  const user = useSelector(selectCurrentUser);
  const {data: userData} = useGetUserQuery(user?.email || '', {
    skip: !user?.email
  });
  const dispatch = useDispatch();
  const [trigger] = useLazyGetUserByTokenQuery();

  useEffect(() => {
    if (userData) {
      dispatch(setUser({
        user: userData
      }))
    }
  }, [userData]);

  useEffect(() => {
    if (!user) {
      const tokenFromLocal = localStorage.getItem('token');
      if (tokenFromLocal) {
        trigger(tokenFromLocal).then(result => {
          dispatch(setCredentials({
            token: tokenFromLocal,
            user: result.data || null
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
            text="정보수정"
            path="/update"
            Icon={PencilSquareIcon}
          />
          <NavItem
            text="서비스관리"
            path="/admin"
            Icon={Cog6ToothIcon}
          />
          <div className="flex items-center"><UserCircleIcon className="w-4 h-4 mr-1" />{`${user.name}(${getUserRoleName(user.role)})님, 환영합니다`}</div>
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