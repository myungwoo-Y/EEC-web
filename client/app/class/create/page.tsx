'use client';

import Date from '@/components/Date';
import Input from '@/components/Input';
import TextEditor from '@/components/TextEditor';
import UploadFile from '@/components/UploadFile';
import { defaultClassDetail } from '@/model/table';
import { useAddClassMutation } from '@/services/class';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm();

  const [detail, setDetail] = useState(defaultClassDetail);
  const [addClass, { isError, isSuccess }] = useAddClassMutation();

  const onSubmitClass = (data: Record<string, any>) => {
    const formData  = new FormData();
    formData.append('title', data.title);
    formData.append('target', data.target);
    formData.append('description', data.description);
    formData.append('detail', detail);
    formData.append('classStart', dayjs(data.classStart).toISOString());
    formData.append('classEnd', dayjs(data.classEnd).toISOString());
    formData.append('registerStart', dayjs(data.registerStart).toISOString());
    formData.append('registerEnd', dayjs(data.registerEnd).toISOString());
    formData.append('thumbnailImage', data.thumbnailImage[0]);
    addClass(formData);
  };

  const router = useRouter();

  if (isSuccess) {
    alert('추가를 완료했습니다.')
    router.push('/class');
  }

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
          error={
            errors.target?.type === 'required' ? '대상을 입력해주세요' : ''
          }
          className="w-full"
        />
        <div className="w-full">
          <p>구성 설명</p>
          <textarea
            className={`resize-y w-full border-[1px] py-1 px-2 rounded-md focus:border-primary h-44 mt-1 ${
              errors.description?.type === 'required' ? 'border-red-600' : 'border-gray-200'
            }`}
            {...register('description', { required: true })}
          />
          {errors.description?.type === 'required' && (
            <p className="text-red-600">설명을 입력해주세요</p>
          )}
        </div>

        <div className="w-full">
          <p className="mb-1">썸네일 이미지</p>
          <UploadFile
            defaultMessage="이미지를 선택해주세요"
            name="thumbnailImage"
            register={register}
            option={{ required: true }}
            watch={watch}
            error={
              errors.thumbnailImage?.type === 'required' ? '이미지를 추가해주세요' : ''
            }
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
            content={detail}
            setContent={setDetail}
            addTable={true}
            className="w-full mt-1"
          />
        </div>

        <button
          className="bg-primary flex items-center justify-center text-white text-lg font-bold py-3 mt-7 w-full rounded-md"
          onClick={handleSubmit(onSubmitClass)}
        >
          저장하기
        </button>
      </div>
    </div>
  );
}

export default Page;
