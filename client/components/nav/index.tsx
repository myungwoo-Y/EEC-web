'use client';

import { selectCurrentUser, setCredentials, setUser } from '@/features/auth/authSlice';
import { useLazyGetUserByTokenQuery } from '@/services/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      trigger().then(result => {
        dispatch(setCredentials({
          user: result.data || null
        }))
      });
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