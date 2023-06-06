"use client"

import Input from '@/components/Input';
import Select from '@/components/Select';
import { addSlashToStr } from '@/lib/date';
import React, { useState } from 'react';

const initUser = {
  email: '',
  password: '',
  classification: '',
  name: '',
  birthday: new Date(),
  phone_number: '',
  department: '',
  job_level: '',
  class_order: ''
}

function Signup() {
  const [newUser, setNewUser] = useState(initUser);
  const [confirPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    console.log(newUser);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-5">
      <form className="pb-24" onSubmit={handleSubmit}>
        <p className="text-3xl font-semibold">회원가입</p>
        <p className="text-lg mt-2 text-gray-400">
          아래의 정보들을 입력해주세요
        </p>
        <Input
          type="email"
          className="w-96 mt-4"
          placeholder="아이디 / 이메일"
          value={newUser.email}
          label="아이디"
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <Input
          type="password"
          className="w-96 mt-4"
          placeholder="비밀번호를 입력해주세요"
          value={newUser.password}
          label="비밀번호"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <Input
          type="password"
          className="w-96 mt-4"
          placeholder="한번 더 입력해주세요"
          value={confirPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          label="비밀번호 확인"
        />
        <Select
          className="mt-4"
          label="구분"
          onChange={(e) =>
            setNewUser({ ...newUser, classification: e.target.value })
          }
        >
          <option value='' disabled selected>
            계정 구분을 선택해주세요
          </option>
          <option value="S">수강생</option>
          <option value="I">강사</option>
        </Select>
        <Input
          type="text"
          className="w-96 mt-4"
          value={newUser.name}
          label="이름"
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <Input
          type="text"
          className="w-96 mt-4"
          placeholder="6자리 숫자"
          value={birthday}
          label="생년월일"
          onChange={(e) => {
            const birthday = e.target.value;

            setBirthday(birthday);

            if (birthday && birthday.length >= 6) {
              const birthdayDate = addSlashToStr(birthday, 2);
              setNewUser({ ...newUser, birthday: new Date(birthdayDate) });
            }
          }}
        />
        <Input
          type="text"
          className="w-96 mt-4"
          placeholder="'-'(하이픈)을 제외하고 입력"
          value={newUser.phone_number}
          label="핸드폰번호"
          onChange={(e) =>
            setNewUser({ ...newUser, phone_number: e.target.value })
          }
        />
        <Input
          type="text"
          className="w-96 mt-4"
          value={newUser.department}
          label="소속"
          onChange={(e) =>
            setNewUser({ ...newUser, department: e.target.value })
          }
        />
        <Input
          type="text"
          className="w-96 mt-4"
          value={newUser.job_level}
          label="직급"
          onChange={(e) =>
            setNewUser({ ...newUser, job_level: e.target.value })
          }
        />
        <Select
          className="mt-4"
          label="기수"
          onChange={(e) =>
            setNewUser({ ...newUser, class_order: e.target.value })
          }
        >
          <option value='' disabled selected>기수를 선택해 주세요</option>
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
        <button
          className="w-full bg-[#2362BA] mt-6 rounded-md flex items-center justify-center text-white text-lg py-2"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
