"use client"

import Input from '@/components/Input';
import Select from '@/components/Select';
import { addSlashToStr } from '@/lib/date';
import { shallowEqual } from '@/lib/object';
import {
  validateClassification,
  validateClassOrder,
  validateConfirmPassword,
  validateDepartment,
  validateEmail,
  validateJobLevel,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '@/lib/validation/userValidate';
import { useAddUserMutation } from '@/services/user';
import React, { useState } from 'react';
import { ErrorMsgMap, CreateUser } from './model';

function Signup() {
  const [newUser, setNewUser] = useState(CreateUser);
  const [confirPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorMsgMap, setErrorMsgMap] = useState(ErrorMsgMap);
  const [addUser, { isLoading, isError, isSuccess }] = useAddUserMutation();

  const clearErrorMsg = (key: keyof typeof errorMsgMap) => {
    setErrorMsgMap({...errorMsgMap, [key]: ''})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrorMsgMap = {...errorMsgMap};

    newErrorMsgMap.email = validateEmail(newUser.email)
    newErrorMsgMap.password = validatePassword(newUser.password);
    newErrorMsgMap.confirmPassword = validateConfirmPassword(newUser.password, confirPassword);
    newErrorMsgMap.classification = validateClassification(newUser.classification);
    newErrorMsgMap.department = validateDepartment(newUser.department);
    newErrorMsgMap.job_level = validateJobLevel(newUser.job_level);
    newErrorMsgMap.name = validateName(newUser.name);
    newErrorMsgMap.phone_number = validatePhoneNumber(newUser.phone_number);
    newErrorMsgMap.class_order = validateClassOrder(newUser.class_order);
    
    if (!shallowEqual(errorMsgMap, newErrorMsgMap)) {
      setErrorMsgMap(newErrorMsgMap);
      return;
    }

    addUser(newUser);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-5">
      <form className="pb-24" onSubmit={handleSubmit} >
        <p className="text-3xl font-semibold">회원가입</p>
        <p className="text-lg mt-2 text-gray-400">
          아래의 정보들을 입력해주세요
        </p>
        <Input
          type="email"
          className="w-96 mt-4"
          placeholder="아이디 / 이메일"
          autoComplete="off"
          value={newUser.email}
          label="아이디"
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value })
            clearErrorMsg('email');
          }}
          error={errorMsgMap.email}
        />
        <Input
          type="password"
          autoComplete="new-password"
          className="w-96 mt-4"
          placeholder="비밀번호를 입력해주세요"
          value={newUser.password}
          label="비밀번호"
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value })
            clearErrorMsg('password')
          }}
          error={errorMsgMap.password}
        />
        <Input
          type="password"
          autoComplete="new-password"
          className="w-96 mt-4"
          placeholder="한번 더 입력해주세요"
          value={confirPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearErrorMsg('confirmPassword')
          }}
          label="비밀번호 확인"
          error={errorMsgMap.confirmPassword}
        />
        <Select
          className="mt-4"
          label="구분"
          error={errorMsgMap.classification}
          onChange={(e) =>{
            setNewUser({ ...newUser, classification: e.target.value })
            clearErrorMsg('classification')
          }}
        >
          <option value='' disabled>
            계정 구분을 선택해주세요
          </option>
          <option value="S">수강생</option>
          <option value="I">강사</option>
        </Select>
        <Input
          type="text"
          className="w-96 mt-4"
          autoComplete="name"
          value={newUser.name}
          label="이름"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value })
            clearErrorMsg('name');
          }}
          error={errorMsgMap.name}
        />
        <Input
          type="number"
          className="w-96 mt-4"
          placeholder="6자리 숫자"
          maxLength={6}
          value={birthday}
          label="생년월일"
          error={errorMsgMap.birthday}
          onChange={(e) => {
            const { value, maxLength } = e.target;
            const birthday = value.slice(0, maxLength);

            setBirthday(birthday);
            clearErrorMsg('birthday');

            if (birthday && birthday.length >= 6) {
              const birthdayDate = addSlashToStr(birthday, 2);
              setNewUser({ ...newUser, birthday: new Date(birthdayDate) });
            }
          }}
        />
        <Input
          type="number"
          className="w-96 mt-4"
          placeholder="'-'(하이픈)을 제외해주세요"
          value={newUser.phone_number}
          label="핸드폰번호"
          error={errorMsgMap.phone_number}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              phone_number: e.target.value.slice(0, 11),
            });
            clearErrorMsg('phone_number');
          }}
        />
        <Input
          type="text"
          className="w-96 mt-4"
          value={newUser.department}
          label="소속"
          error={errorMsgMap.department}
          onChange={(e) => {
            setNewUser({ ...newUser, department: e.target.value })
            clearErrorMsg('department');
          }}
        />
        <Input
          type="text"
          className="w-96 mt-4"
          value={newUser.job_level}
          label="직급"
          error={errorMsgMap.job_level}
          onChange={(e) => {
            setNewUser({ ...newUser, job_level: e.target.value })
            clearErrorMsg('job_level');
          }}
        />
        <Select
          className="mt-4"
          label="기수"
          error={errorMsgMap.class_order}
          onChange={(e) => {
            setNewUser({ ...newUser, class_order: e.target.value })
            clearErrorMsg('class_order');
          }}
        >
          <option value='' disabled>기수를 선택해 주세요</option>
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
