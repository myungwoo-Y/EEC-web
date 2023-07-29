"use client"

import Input from '@/components/Input';
import Select from '@/components/Select';
import { addSlashToStr } from '@/lib/date';
import { shallowEqual } from '@/lib/object';
import { useRouter } from 'next/navigation';
import {
  validateClassOrder,
  validateConfirmPassword,
  validateDepartment,
  validateJobLevel,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '@/lib/validation/userValidate';
import { useUpdateUserMutation } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { ErrorMsgMap } from '../signup/model';
import { UpdateUser, User } from '@/model/user';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { filterExisting, getUserRoleName } from '@/lib/user';
import dayjs from 'dayjs';

function UserUpdate() {
  const user = useSelector(selectCurrentUser);
  const [updatedUser, setUpdatedUser] = useState<UpdateUser>({});
  const [confirPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorMsgMap, setErrorMsgMap] = useState(ErrorMsgMap);
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
      setConfirmPassword(user.password);
      setBirthday(dayjs(user.birthday).format('YYMMDD'));
    }
  }, [user])
  
  const clearErrorMsg = (key: keyof typeof errorMsgMap) => {
    setErrorMsgMap({...errorMsgMap, [key]: ''});
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrorMsgMap = {...errorMsgMap};

    newErrorMsgMap.password = validatePassword(updatedUser.password);
    newErrorMsgMap.confirmPassword = validateConfirmPassword(updatedUser.password, confirPassword);
    newErrorMsgMap.department = validateDepartment(updatedUser.department);
    newErrorMsgMap.jobLevel = validateJobLevel(updatedUser.jobLevel);
    newErrorMsgMap.name = validateName(updatedUser.name);
    newErrorMsgMap.phoneNumber = validatePhoneNumber(updatedUser.phoneNumber);
    newErrorMsgMap.classOrder = validateClassOrder(updatedUser.classOrder);
    
    if (!shallowEqual(errorMsgMap, newErrorMsgMap)) {
      setErrorMsgMap(newErrorMsgMap);
      return;
    }

    const filteredUser = filterExisting(updatedUser, user);
    console.log(filteredUser);

    try {
      await updateUser(filteredUser).unwrap();
      alert('정보 수정을 완료했습니다.');
      router.push('/');
    } catch (e) {
      alert('정보 수정에 실패했습니다.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full mt-5">
      <form className="pb-24" onSubmit={handleSubmit}>
        <p className="text-3xl font-semibold">정보수정</p>
        <p className="text-lg mt-2 text-gray-400">
          아래의 정보들을 입력해주세요
        </p>
        <Input
          type="email"
          className="w-[600px] mt-4"
          placeholder="이메일"
          value={user?.email}
          label="이메일"
          disabled={true}
        />
        <Input
          type="password"
          autoComplete="new-password"
          className="w-[600px] mt-4"
          placeholder="비밀번호를 입력해주세요"
          value={updatedUser.password}
          label="비밀번호"
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, password: e.target.value });
            clearErrorMsg('password');
          }}
          error={errorMsgMap.password}
        />
        <Input
          type="password"
          autoComplete="new-password"
          className="w-[600px] mt-4"
          placeholder="한번 더 입력해주세요"
          value={confirPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearErrorMsg('confirmPassword');
          }}
          label="비밀번호 확인"
          error={errorMsgMap.confirmPassword}
        />
        <Input
          type="email"
          className="w-[600px] mt-4"
          placeholder="구분"
          value={getUserRoleName(user?.role)}
          label="구분"
          disabled={true}
        />
        <Input
          type="text"
          className="w-[600px] mt-4"
          autoComplete="name"
          value={updatedUser.name}
          label="이름"
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, name: e.target.value });
            clearErrorMsg('name');
          }}
          error={errorMsgMap.name}
        />
        <Input
          type="number"
          className="w-[600px] mt-4"
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
              setUpdatedUser({ ...updatedUser, birthday: new Date(birthdayDate) });
            }
          }}
        />
        <Input
          type="number"
          className="w-[600px] mt-4"
          placeholder="'-'(하이픈)을 제외해주세요"
          value={updatedUser.phoneNumber}
          label="핸드폰번호"
          error={errorMsgMap.phoneNumber}
          onChange={(e) => {
            setUpdatedUser({
              ...updatedUser,
              phoneNumber: e.target.value.slice(0, 11),
            });
            clearErrorMsg('phoneNumber');
          }}
        />
        <Input
          type="text"
          className="w-[600px] mt-4"
          value={updatedUser.department}
          label="소속"
          error={errorMsgMap.department}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, department: e.target.value });
            clearErrorMsg('department');
          }}
        />
        <Input
          type="text"
          className="w-[600px] mt-4"
          value={updatedUser.jobLevel}
          label="직급"
          error={errorMsgMap.jobLevel}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, jobLevel: e.target.value });
            clearErrorMsg('jobLevel');
          }}
        />
        <Select
          className="mt-4 w-[600px]"
          label="기수"
          error={errorMsgMap.classOrder}
          onChange={(e) => {
            setUpdatedUser({ ...updatedUser, classOrder: e.target.value });
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

        <button
          className="w-full bg-[#2362BA] mt-6 rounded-md flex items-center justify-center text-white text-lg py-2"
          type="submit"
        >
          저장
        </button>
      </form>
    </div>
  );
}

export default UserUpdate;
