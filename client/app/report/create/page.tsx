'use client';

import Input from '@/components/Input';
import { selectCurrentUser } from '@/features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import checkboxStyles from '../../../components/Checkbox.module.scss';
import classNames from 'classnames';
import Basis from '@/components/report/Basis';
import { useGetClassesQuery } from '@/services/class';


function CreateReportPage() {
  const { register } = useForm();
  const user = useSelector(selectCurrentUser);
  const { data: classes } = useGetClassesQuery();
  const [basisState, setBasisState] = useState<(number | string)[]>([]);

  useEffect(() => {
    const commonInputCount = 33;
    if (classes?.length) {
      setBasisState(Array(commonInputCount + (classes.length * 4)).fill(''));
    } else {
      setBasisState(Array(commonInputCount).fill(''));
    }
  }, [classes]);

  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">역학조사관 분기실적보고</div>

      <div className="mt-10">
        <p className="text-xl font-semibold">기본정보</p>
        <table className="w-full mt-2">
          <thead>
            <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-50">
              <th className="border-gray-300 border-[1px] border-t-black py-2 w-24">
                연도
              </th>
              <th className="border-gray-300 border-[1px] border-t-black">
                분기
              </th>
              <th className="border-gray-300 border-[1px] border-t-black w-96">
                소속
              </th>
              <th className="border-gray-300 border-[1px] border-t-black">
                직급
              </th>
              <th className="border-gray-300 border-[1px] border-t-black">
                성명
              </th>
              <th className="border-gray-300 border-[1px] border-t-black w-16">
                서명동의
              </th>
              <th className="border-gray-300 border-[1px] border-t-black">
                제출일
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border-gray-300 border-[1px] p-2">
                <Input type="number" register={register} name="year" />
              </td>
              <td className="border-gray-300 border-[1px] p-2 w-16">
                <Input type="number" register={register} name="quarter" />
              </td>
              <td className="border-gray-300 border-[1px] p-2">{user?.department}</td>
              <td className="border-gray-300 border-[1px] p-2">{user?.jobLevel}</td>
              <td className="border-gray-300 border-[1px] p-2">{user?.name}</td>
              <td className="border-gray-300 border-[1px] p-2">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className={classNames(checkboxStyles.rectangle)}
                    {...register('agree')}
                  />
                </div>
              </td>
              <td className="border-gray-300 border-[1px] p-2 w-44">
                <input
                  type="date"
                  className="h-8 box-border border-gray-400 border-[1px] p-[6px] outline-none rounded-md flex-grow focus:border-primary focus:border-2"
                  {...register('certificationDate')}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Basis classes={classes}/>
    </div>
  );
}

export default CreateReportPage;
