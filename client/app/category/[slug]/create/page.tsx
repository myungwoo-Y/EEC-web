"use client"

import Input from '@/components/Input'
import Select from '@/components/Select'
import TextEditor from '@/components/TextEditor';
import UploadFiles from '@/components/UploadFiles';
import { useGetCategoryByIdQuery } from '@/services/post';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

type Props = {
  params: {
    slug: string;
  };
};


function Page({params: { slug }}: Props) {
  const { data } = useGetCategoryByIdQuery(slug);
  const [title, settitle] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {console.log(data)};

  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">{data?.name}</div>
      <table className="border-t-[1px] border-t-black w-full mt-10 border-x-[1px] p-2">
        <tbody>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">제목</td>
            <td className="px-4">
              <Input
                type="text"
                register={register}
                name="title"
                option={{ required: true }}
                error={errors.title?.type === "required" ? '제목을 입력해주세요' : ''}
              />
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">공개여부</td>
            <td className="px-4">
              <Select
                register={register}
                name="공개"
                option={{ required: true }}
              >
                <option value="true">전체공개</option>
                <option value="false">비공개</option>
              </Select>
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">첨부파일</td>
            <td className="px-4">
              <UploadFiles files={files} setFiles={setFiles} />
            </td>
          </tr>
        </tbody>
      </table>
      <TextEditor className="mt-6" setContent={setContent} />
      <div className="flex justify-center mt-10 mb-6">
        <div>
          <button
            className="bg-gray-300 text-center px-6 py-3 rounded-md mr-2 font-semibold"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            className="bg-primary text-center px-6 py-3 rounded-md text-white font-semibold"
            onClick={handleSubmit(onSubmit)}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
