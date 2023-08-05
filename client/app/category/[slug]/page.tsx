'use client';

import AnswerButton from '@/components/AnswerButton';
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
          <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-50">
            <th className="py-3">번호</th>
            <th className="w-3/5">제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>{category === 'Q&A' ? '처리결과' : '조회수'}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post) => (
            <tr
              key={post.postId}
              className="border-y-[1px] hover:bg-gray-50"
              onClick={() => router.push(`/post/${post.postId}`)}
            >
              <td className="text-center py-3">{post.postId}</td>
              <td>{post.title}</td>
              <td className="text-center">{post?.user?.name}</td>
              <td className="text-center">
                {post.createDateTime?.slice(0, 10)}
              </td>
              <td className="text-center">
                {category !== 'Q&A' ? post.viewCount : <AnswerButton post={post} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="float-right w-24 bg-primary px-3 py-2 text-white ml-auto text-center rounded-md mt-10"
        onClick={() => router.push(window.location.href + '/create')}
      >
        {category === 'Q&A' ? '질문하기' : '작성하기'}
      </button>
    </div>
  );
}

export default Page;
