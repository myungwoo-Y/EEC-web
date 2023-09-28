'use client';

import Input from '@/components/Input';
import { setCredentials } from '@/features/auth/authSlice';
import { useLoginMutation } from '@/services/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const isRedirect = searchParams.get('redirect');

  useEffect(() => {
    if (isRedirect?.toLowerCase() === 'true') {
      setTimeout(() => {
        alert('로그인 후 이용해주세요.');
      }, 100);
    }
  }, [isRedirect]);

  const handleLogin = async () => {
    try {
      const user = await login({
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(user));

      push('/');
    } catch (e) {
      alert('로그인을 다시 시도해주세요');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-24 px-3 lg:px-0 w-full lg:w-fit">
        <p className="text-xl lg:text-3xl font-semibold mt-[40%] lg:mt-0">방문을 환영합니다</p>
        <p className="text-lg mt-2 text-gray-400">로그인 정보를 입력해주세요</p>
        <Input
          type="text"
          className="w-full lg:w-96 mt-4"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="email"
          label="이메일"
        />
        <Input
          type="password"
          className="w-full lg:w-96 mt-3"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          label="비밀번호"
        />
        <button
          className="w-full bg-[#2362BA] mt-6 rounded-md flex items-center justify-center text-white text-lg py-2"
          onClick={handleLogin}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
