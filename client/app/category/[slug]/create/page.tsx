'use client';

import Input from '@/components/Input';
import Select from '@/components/Select';
import TextEditor from '@/components/TextEditor';
import UploadFiles from '@/components/UploadFiles';
import { useAddPostMutation, useGetCategoryByIdQuery } from '@/services/post';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  params: {
    slug: string;
  };
};

function Page({ params: { slug } }: Props) {
  const { data: category } = useGetCategoryByIdQuery(slug);
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const router = useRouter();

  const [addPost, { isError, isSuccess }] = useAddPostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  if (isSuccess) {
    alert('게시물이 추가되었습니다');
    router.back();
  }

  const onSubmit = (data: Record<string, any>) => {
    if (!content) {
      alert('내용을 입력해주세요');
      return;
    }

    const formData = new FormData();
    files.map((file) => {
      formData.append('files', file);
    });
    formData.append('title', data.title);
    formData.append('content', content);
    formData.append('categoryId', category?.categoryId + '');
    formData.append('isOpen', data.isOpen);
    addPost(formData);
  };

  return (
    <div className="py-5 lg:py-10 px-3 lg:px-12">
      <div className="font-bold text-2xl">{category?.name}</div>
      <table className="border-t-[1px] border-t-black w-full mt-10 border-x-[1px] p-2">
        <tbody>
          <tr className="border-b-2">
            <td className="py-5 min-w-[70px] px-1 w-28 bg-gray-100 text-center">
              제목
            </td>
            <td className="px-4">
              <Input
                type="text"
                register={register}
                name="title"
                option={{ required: true }}
                error={
                  errors.title?.type === 'required' ? '제목을 입력해주세요' : ''
                }
              />
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">공개여부</td>
            <td className="px-4">
              <Select
                register={register}
                name="isOpen"
                option={{ required: true }}
                watch={watch}
              >
                <option value="true">전체공개</option>
                <option value="false">비공개</option>
              </Select>
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">첨부파일</td>
            <td className="px-4">
              <div className="overflow-x-auto w-[250px] lg:w-full">
                <UploadFiles
                  className="w-fit"
                  files={files}
                  setFiles={setFiles}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <TextEditor
          className="mt-6"
          setContent={setContent}
          content={content}
        />
      </div>
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
