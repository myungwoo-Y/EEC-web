import Input from '@/components/Input';
import React from 'react';

function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-24">
        <p className="text-3xl font-semibold">회원가입</p>
        <p className="text-lg mt-2 text-gray-400">
          아래의 정보들을 입력해주세요
        </p>
        <Input
          type="email"
          className="w-96 mt-4"
          placeholder="email"
          value=""
          label="아이디"
        />
        <Input
          type="password"
          className="w-96 mt-4"
          placeholder="password"
          value=""
          label="비밀번호"
        />
        <Input
          type="password"
          className="w-96 mt-4"
          placeholder="confirm password"
          value=""
          label="비밀번호 확인"
        />
        <div className="mt-4">
          <p>구분</p>
          <select></select>
        </div>
        <Input type="text" className="w-96 mt-4" value="" label="이름" />
        <Input
          type="number"
          className="w-96 mt-4"
          placeholder="6자리 숫자"
          value=""
          label="생년월일"
        />
        <Input
          type="number"
          className="w-96 mt-4"
          placeholder="'-'(하이픈)을 제외하고 입력"
          value=""
          label="핸드폰번호"
        />
        <Input type="text" className="w-96 mt-4" value="" label="소속" />
        <Input type="text" className="w-96 mt-4" value="" label="직급" />
        <div className="mt-4">
          <p>기수</p>
          <select></select>
        </div>
        <button className="w-full bg-[#2362BA] mt-6 rounded-md flex items-center justify-center text-white text-lg py-2">
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
