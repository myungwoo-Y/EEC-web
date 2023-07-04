'use client';

import Date from '@/components/Date';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import React from 'react';
import { useForm } from 'react-hook-form';

function Page() {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">강의 추가하기</div>
      <div className="flex flex-col items-center gap-4 mt-10">
        <div className="font-bold text-2xl">아래 정보를 입력해주세요</div>
        <Input
          type="text"
          register={register}
          name="title"
          label="강의 이름"
          option={{ required: true }}
          error={errors.title?.type === 'required' ? '제목을 입력해주세요' : ''}
          className="w-96"
        />

        <Input
          type="text"
          register={register}
          name="target"
          label="교육 대상"
          option={{ required: true }}
          error={errors.title?.type === 'required' ? '제목을 입력해주세요' : ''}
          className="w-96"
        />
        <div>
          <p>구성</p>
          <textarea
            className="resize-y w-96 border-gray-200 border-2 py-1 px-2 rounded-md focus:border-primary h-44 mt-1"
          />
        </div>

        <Date
          name="교육기간"
          className="w-96"
          register={register}
          firstDateName="classStart"
          secondDateName="classEnd"
          option={{ required: true }}
        />
        <Date
          name="신청기간"
          className="w-96"
          register={register}
          firstDateName="registerStart"
          secondDateName="registerEnd"
          option={{ required: true }}
        />

        <TextEditor 
          content=""
          setContent={() => null}
          addTable={true}
          className="w-full"
        />
        
      </div>
    </div>
  );
}

export default Page;
