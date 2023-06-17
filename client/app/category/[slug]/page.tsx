'use client';

import { selectCurrentCategoryName } from '@/features/post/postSlice';
import { postApi } from '@/services/post';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

type Props = {
  params: {
    slug: string;
  };
};

function Page({ params: { slug: categoryId } }: Props) {
  const category = useSelector(selectCurrentCategoryName(parseInt(categoryId)));
  const { data } = postApi.useGetPostsQuery(categoryId);
  const router = useRouter()


  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">{category}</div>
      <table className="w-full mt-10">
        <thead>
          <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-100">
            <th className="py-1">번호</th>
            <th className="w-3/5">제목</th>
            <th>작성자</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post) => (
            <tr
              key={post.id}
              className="border-y-[1px] hover:bg-gray-50"
              onClick={() => router.push(`/post/${post.post_id}`)}
            >
              <td className="text-center py-2">{post.post_id}</td>
              <td>{post.title}</td>
              <td className="text-center">{post?.user?.name}</td>
              <td className="text-center">
                {post.createDateTime?.slice(0, 10)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="float-right w-24 bg-primary px-3 py-2 text-white ml-auto text-center rounded-md mt-10"
        onClick={() => router.push(window.location.href + '/create')}
      >
        질문하기
      </button>
    </div>
  );
}

export default Page;
