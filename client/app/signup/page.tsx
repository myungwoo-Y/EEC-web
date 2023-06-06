"use client"

import Input from '@/components/Input';
import Select from '@/components/Select';
import React from 'react';

function Signup() {
  return (
    <div className="flex flex-col items-center justify-center h-full mt-5">
      <div className="pb-24">
        <p className="text-3xl font-semibold">회원가입</p>
        <p className="text-lg mt-2 text-gray-400">
          아래의 정보들을 입력해주세요
        </p>
        <Input
          type="email"
          className="w-96 mt-4"
          placeholder="아이디 / 이메일"
          value=""
          label="아이디"
        />
        <Input
          type="password"
          className="w-96 mt-4"
          placeholder="비밀번호를 입력해주세요"
          value=""
          label="비밀번호"
        />
        <Input
          type="password"
          className="w-96 mt-4"
          placeholder="한번 더 입력해주세요"
          value=""
          label="비밀번호 확인"
        />
        <Select className="mt-4" label="구분">
          <option value="" disabled>계정 구분을 선택해주세요</option>
          <option value="S">수강생</option>
          <option value="I">강사</option>
        </Select>
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
        <Select className="mt-4" label="기수">
          <option value="">기수를 선택해 주세요</option>
          <option value="1">1기</option>
          <option value="2">2기</option>
          <option value="3">3기</option>
          <option value="4">4기</option>
          <option value="5">5기</option>
          <option value="6">6기</option>
          <option value="7">7기</option>
          <option value="8">8기</option>
          <option value="9">9기</option>
          <option value="10">10기</option>
        </Select>
        <button className="w-full bg-[#2362BA] mt-6 rounded-md flex items-center justify-center text-white text-lg py-2">
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
