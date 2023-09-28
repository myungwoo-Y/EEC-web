'use client';

import Input from '@/components/Input';
import { selectCurrentUser } from '@/features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import checkboxStyles from '../../../components/Checkbox.module.scss';
import classNames from 'classnames';
import Basis from '@/components/report/Basis';
import { BasisCount, CreateReport, fileENNames, fileNames } from '@/model/report';
import dayjs from 'dayjs';
import FileTable from '@/components/report/FileTable';
import { useAddReportMutation } from '@/services/report';
import { useRouter } from 'next/navigation';
import { File } from '@/model/file';


function CreateReportPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const user = useSelector(selectCurrentUser);
  const [files, setFiles] = useState<File[][]>(Array(fileNames.length).fill([]));
  const [addReport, { isSuccess }] = useAddReportMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      alert('추가에 성공했습니다.')
      router.push('/report');
    }
  }, [isSuccess])

  const setFileOnTable = (newFiles: File[], pos: number) => {
    const nextFiles = [...files];
    nextFiles[pos] = newFiles;
    setFiles(nextFiles);
  }

  const onSave = (data: Record<string, any>) => {
    if (!data.agree) {
      alert('서명동의를 체크해주세요');
      return;
    }

    const basis = Array(BasisCount);
    Object.keys(data).map((key, idx) => {
      if (!isNaN(+key)) {
        basis[idx] = data[key];
      }
    });

    const newReport: CreateReport = {
      userId: user?.userId || -1,
      basis: basis.join('|'),
      year: data.year,
      quarter: data.quarter,
      certificationDate: dayjs(data.certificationDate).toISOString(),
      revisedFiles: files[0],
      presentationFiles: files[1],
      reportFiles: files[2],
      pressFiles: files[3],
      paperFiles: files[4],
    }

    addReport(newReport);
  }


  return (
    <div className="py-5 lg:pt-10 px-3 lg:px-12">
      <div className="font-bold text-2xl">역학조사관 분기실적보고</div>

      <div className="mt-10 overflow-x-auto">
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
                <Input className="w-20" type="number" register={register} name="year" option={{ required: true }} error={errors.year?.type === "required" ? ' ' : ''} />
              </td>
              <td className="border-gray-300 border-[1px] p-2 w-16">
                <Input className="w-10" type="number" register={register} name="quarter" option={{ required: true }} error={errors.quarter?.type === "required" ? ' ' : ''} />
              </td>
              <td className="border-gray-300 border-[1px] p-2">
                <div className="min-w-[100px]">{user?.department}</div>
              </td>
              <td className="border-gray-300 border-[1px] p-2">
                <div className="min-w-[100px]">{user?.jobLevel}</div>
              </td>
              <td className="border-gray-300 border-[1px] p-2">
                <div className="min-w-[100px]">{user?.name}</div>
              </td>
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
                  className={`h-8 box-border border-gray-400 border-[1px] p-[6px] outline-none rounded-md flex-grow focus:border-primary focus:border-2 ${errors.certificationDate?.type === "required" ? 'border-red-500' : ''}`}
                  {...register('certificationDate', { required: true })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Basis register={register} watch={watch}/>
      <FileTable 
        files={files}
        setFiles={setFileOnTable}
      />
      <div className="flex gap-3 float-right pb-6 mt-10">
        <button className="bg-gray-300 flex items-center justify-center text-lg font-bold py-3 mt-7 w-24 rounded-md">
          취소
        </button>
        <button
          onClick={handleSubmit(onSave)}
          className="bg-primary flex items-center justify-center text-white text-lg font-bold py-3 mt-7 w-24 rounded-md"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default CreateReportPage;
