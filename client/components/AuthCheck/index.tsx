'use client';

import { selectCurrentUser } from '@/features/auth/authSlice';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function AuthCheck() {
  const user = useSelector(selectCurrentUser);
  const pathname = usePathname();

  useEffect(() => {
    if (!user && !(pathname === '/login' || pathname === '/')) {
      alert('로그인을 완료해주세요');
      window.location.href = '/login';
    }
    
  }, [pathname])
  
  return (
    <></>
  )
}

export default AuthCheck