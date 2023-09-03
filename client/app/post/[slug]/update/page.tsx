'use client';

import Input from '@/components/Input';
import Select from '@/components/Select';
import TextEditor from '@/components/TextEditor';
import UploadFiles from '@/components/UploadFiles';
import { getFileFromUrl } from '@/lib/downloadFile';
import { File } from '@/model/file';
import { useGetPostQuery, useUpdatePostMutation } from '@/services/post';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  params: {
    slug: string;
  };
};

function Page({ params: { slug: postId } }: Props) {
  const { data: post } = useGetPostQuery(postId);
  const [files, setFiles] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const router = useRouter();

  const [updatePost, { isError, isSuccess }] = useUpdatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const onSubmit = (data: Record<string, any>) => {
    updatePost({
      postId: parseInt(postId),
      title: data.title,
      content,
      categoryId: post?.category.categoryId ?? -1,
      isOpen: data.isOpen,
      files
    });
  };

  useEffect(() => {
    if (isSuccess) {
      alert('수정을 완료했습니다.');
      router.push(`/category/${post?.category.categoryId}`)
    }
  }, [isSuccess])

  useEffect(() => {
    if (post) {
      reset({
        title: post?.title,
        content: post?.content,
        isOpen: post?.isOpen,
      });
      setContent(post.content);

      setFiles(post.files);
    }
  }, [post, reset]);
  return (
    <div className="py-5 lg:py-10 px-3 lg:px-12">
      <div className="font-bold text-2xl">{post?.category.name}</div>
      <table className="border-t-[1px] border-t-black w-full mt-10 border-x-[1px] p-2">
        <tbody>
          <tr className="border-b-2">
            <td className="py-5 px-1 min-w-[70px] bg-gray-100 text-center">제목</td>
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
                <option value='' disabled>
                  공개 여부를 선택해주세요
                </option>
                <option value="true">전체공개</option>
                <option value="false">비공개</option>
              </Select>
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">첨부파일</td>
            <td className="px-4">
              <div className="overflow-x-auto w-[250px]  sm:w-[500px] md:w-[600px] lg:w-full">
                <UploadFiles className="w-fit" files={files} setFiles={setFiles} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <TextEditor className="mt-6" setContent={setContent} content={content} />
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
