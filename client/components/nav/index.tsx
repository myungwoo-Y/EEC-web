'use client';

import { removeCredentials, selectCurrentUser, setCredentials, setUser } from '@/features/auth/authSlice';
import { getUserRoleName } from '@/lib/user';
import { useLazyGetUserByTokenQuery } from '@/services/auth';
import { ArrowRightOnRectangleIcon , PencilSquareIcon, UserCircleIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/outline';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from '../NavItem';
import { useGetUserQuery } from '@/services/user';
import PCNav from './PCNav';
import MobileNav from './MobileNav';

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
    <>
      <div className="hidden lg:block">
        <PCNav user={user}/>
      </div>
      <div className="block lg:hidden">
        <MobileNav user={user} />
      </div>
    </>
  );
}

export default Nav;