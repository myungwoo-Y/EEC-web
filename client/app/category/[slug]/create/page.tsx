"use client"

import Input from '@/components/Input'
import Select from '@/components/Select'
import UploadFiles from '@/components/UploadFiles';
import { useGetCategoryByIdQuery } from '@/services/post';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

type Props = {
  params: {
    slug: string;
  };
};


function Page({params: { slug }}: Props) {
  const { data } = useGetCategoryByIdQuery(slug);
  const [temp, setTemp] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">{data?.name}</div>
      <table className="border-t-[1px] border-t-black w-full mt-10 border-x-[1px] p-2">
        <tbody>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">제목</td>
            <td className="px-4">
              <Input value={temp} type="text" onChange={(e) => setTemp(e.target.value)} />
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">공개여부</td>
            <td className="px-4">
              <Select>
                <option>전체공개</option>
                <option>비공개</option>
              </Select>
            </td>
          </tr>
          <tr className="border-b-2">
            <td className="py-5 px-1 w-28 bg-gray-100 text-center">첨부파일</td>
            <td className="px-4">
              <UploadFiles
                files={files}
                setFiles={setFiles}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center mt-10">
        <div>
          <button 
            className="bg-gray-300 text-center px-6 py-3 rounded-md mr-2 font-semibold"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button className="bg-primary text-center px-6 py-3 rounded-md text-white font-semibold">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
