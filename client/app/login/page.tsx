"use client"

import Input from "@/components/Input";
import { setCredentials } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/services/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const { push } = useRouter();

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
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-24">
        <p className="text-3xl font-semibold">Welcome back!</p>
        <p className="text-lg mt-2 text-gray-400">로그인 정보를 입력해주세요</p>
        <div className="mt-4">
          <p>ID</p>
          <Input
            type="email"
            className="w-96"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
        </div>
        <div className="mt-2">
          <p>PW</p>
          <Input
            type="password"
            className="w-96"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
        </div>
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
