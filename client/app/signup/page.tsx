"use client"

import Input from '@/components/Input';
import Select from '@/components/Select';
import { addSlashToStr } from '@/lib/date';
import { shallowEqual } from '@/lib/object';
import { useRouter } from 'next/navigation';
import {
  validateRole,
  validateClassOrder,
  validateConfirmPassword,
  validateDepartment,
  validateEmail,
  validateJobLevel,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '@/lib/validation/userValidate';
import { useAddUserMutation, useLazyGetUserQuery } from '@/services/user';
import React, { useState } from 'react';
import { ErrorMsgMap, CreateUser } from './model';
import Agreement from '@/components/Agreement';
import { UserRole } from '@/model/user';

function Signup() {
  const [newUser, setNewUser] = useState(CreateUser);
  const [confirPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorMsgMap, setErrorMsgMap] = useState(ErrorMsgMap);
  const [addUser] = useAddUserMutation();
  const [triggerUserByEmail, userResult] = useLazyGetUserQuery();
  const [isAgreementChecked, setisAgreementChecked] = useState(false);
  const router = useRouter();

  const user = userResult.data;

  const clearErrorMsg = (key: keyof typeof errorMsgMap) => {
    setErrorMsgMap({...errorMsgMap, [key]: ''})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrorMsgMap = {...errorMsgMap};

    newErrorMsgMap.email = await validateEmail(newUser.email, user);
    newErrorMsgMap.password = validatePassword(newUser.password);
    newErrorMsgMap.confirmPassword = validateConfirmPassword(newUser.password, confirPassword);
    newErrorMsgMap.role = validateRole(newUser.role || '');
    newErrorMsgMap.department = validateDepartment(newUser.department);
    newErrorMsgMap.jobLevel = validateJobLevel(newUser.jobLevel);
    newErrorMsgMap.name = validateName(newUser.name);
    newErrorMsgMap.phoneNumber = validatePhoneNumber(newUser.phoneNumber);
    newErrorMsgMap.classOrder = validateClassOrder(newUser.classOrder);
    
    if (!shallowEqual(errorMsgMap, newErrorMsgMap)) {
      setErrorMsgMap(newErrorMsgMap);
      return;
    }

    if (!isAgreementChecked) {
      alert('개인정보 수집에 동의해주세요');
      return;
    }

    try {
      await addUser(newUser).unwrap();
      alert('회원가입을 완료했습니다.');
      router.push('/login');
    } catch (e) {
      alert('회원가입에 실패했습니다.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-5 px-3 lg:px-0">
      <form className="pb-24" onSubmit={handleSubmit}>
        <p className="text-xl lg:text-3xl font-semibold">회원가입</p>
        <p className="text-lg mt-2 text-gray-400">
          아래의 정보들을 입력해주세요
        </p>
        <Input
          type="email"
          className="lg:w-[600px] mt-4"
          placeholder="이메일"
          autoComplete="off"
          value={newUser.email}
          label="이메일"
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
            clearErrorMsg('email');
          }}
          onBlur={async (e) => {
            const res = await triggerUserByEmail(e.target.value);
            setErrorMsgMap({
              ...errorMsgMap,
              email: validateEmail(newUser.email, res.data) as string,
            });
          }}
          error={errorMsgMap.email}
        />
        <Input
          type="password"
          autoComplete="new-password"
          className="lg:w-[600px] mt-4"
          placeholder="비밀번호를 입력해주세요"
          value={newUser.password}
          label="비밀번호"
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
            clearErrorMsg('password');
          }}
          error={errorMsgMap.password}
        />
        <Input
          type="password"
          autoComplete="new-password"
          className="lg:w-[600px] mt-4"
          placeholder="한번 더 입력해주세요"
          value={confirPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearErrorMsg('confirmPassword');
          }}
          label="비밀번호 확인"
          error={errorMsgMap.confirmPassword}
        />
        <Select
          className="mt-4 lg:w-[600px]"
          label="구분"
          error={errorMsgMap.role}
          onChange={(e) => {
            setNewUser({ ...newUser, role: e.target.value });
            clearErrorMsg('role');
          }}
        >
          <option value="" disabled>
            계정 구분을 선택해주세요
          </option>
          <option value={UserRole.STUDENT}>수강생</option>
          <option value={UserRole.LECTURER}>강사</option>
        </Select>
        <Input
          type="text"
          className="lg:w-[600px] mt-4"
          autoComplete="name"
          value={newUser.name}
          label="이름"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
            clearErrorMsg('name');
          }}
          error={errorMsgMap.name}
        />
        <Input
          type="number"
          className="lg:w-[600px] mt-4"
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
          className="lg:w-[600px] mt-4"
          placeholder="'-'(하이픈)을 제외해주세요"
          value={newUser.phoneNumber}
          label="핸드폰번호"
          error={errorMsgMap.phoneNumber}
          onChange={(e) => {
            setNewUser({
              ...newUser,
              phoneNumber: e.target.value.slice(0, 11),
            });
            clearErrorMsg('phoneNumber');
          }}
        />
        <Input
          type="text"
          className="lg:w-[600px] mt-4"
          value={newUser.department}
          label="소속"
          error={errorMsgMap.department}
          onChange={(e) => {
            setNewUser({ ...newUser, department: e.target.value });
            clearErrorMsg('department');
          }}
        />
        <Input
          type="text"
          className="lg:w-[600px] mt-4"
          value={newUser.jobLevel}
          label="직급"
          error={errorMsgMap.jobLevel}
          onChange={(e) => {
            setNewUser({ ...newUser, jobLevel: e.target.value });
            clearErrorMsg('jobLevel');
          }}
        />
        <Select
          className="mt-4 lg:w-[600px]"
          label="기수"
          error={errorMsgMap.classOrder}
          onChange={(e) => {
            setNewUser({ ...newUser, classOrder: e.target.value });
            clearErrorMsg('classOrder');
          }}
        >
          <option value="" disabled>
            기수를 선택해 주세요
          </option>
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
        <Agreement
          isChecked={isAgreementChecked}
          className="lg:w-[600px] mt-10"
          onClick={() => setisAgreementChecked((checked) => !checked)}
        />
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
