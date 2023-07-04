'use client';

import Date from '@/components/Date';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import UploadFile from '@/components/UploadFile';
import UploadFiles from '@/components/UploadFiles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Page() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="py-10 px-12">
      <p className="font-bold text-2xl">강의 추가하기</p>
      <div className="flex flex-col items-center gap-4 mt-10 mx-auto w-[800px]">
        <p className="font-bold text-2xl">아래 정보를 입력해주세요</p>
        <Input
          type="text"
          register={register}
          name="title"
          label="강의 이름"
          option={{ required: true }}
          error={errors.title?.type === 'required' ? '제목을 입력해주세요' : ''}
          className="w-full"
        />

        <Input
          type="text"
          register={register}
          name="target"
          label="교육 대상"
          option={{ required: true }}
          error={errors.title?.type === 'required' ? '제목을 입력해주세요' : ''}
          className="w-full"
        />
        <div className="w-full">
          <p>구성</p>
          <textarea
            className="resize-y w-full border-gray-200 border-2 py-1 px-2 rounded-md focus:border-primary h-44 mt-1"
          />
        </div>

        <div className="w-full">
          <p className="mb-1">썸네일 이미지</p>
          <UploadFile 
            file={file}
            setFile={setFile}
            defaultMessage="이미지를 선택해주세요"
          />
        </div>

        <Date
          name="교육기간"
          register={register}
          firstDateName="classStart"
          secondDateName="classEnd"
          option={{ required: true }}
          className="w-full"
        />
        <Date
          name="신청기간"
          register={register}
          firstDateName="registerStart"
          secondDateName="registerEnd"
          option={{ required: true }}
          className="w-full"
        />

        <div className="w-full mt-4">
          <p>교과목상세</p>
          <TextEditor 
            content=""
            setContent={() => null}
            addTable={true}
            className="w-full mt-1"
          />
        </div>
        
        
      </div>
    </div>
  );
}

export default Page;
