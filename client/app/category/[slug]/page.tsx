'use client';

import AnswerLabel from '@/components/AnswerLabel';
import { selectCurrentCategoryName } from '@/features/post/postSlice';
import { isQuestion } from '@/lib/category';
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

  const isQuestionPost = isQuestion(category);

  return (
    <div className="py-5 lg:py-10 px-3 lg:px-12">
      <div className="font-bold text-2xl">{category}</div>
      <table className="w-full mt-10">
        <thead>
          <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-50">
            <th className="py-3 min-w-[40px] hidden lg:block">번호</th>
            <th className="w-3/5 py-3">제목</th>
            <th className="py-3 min-w-[60px] hidden lg:block">작성자</th>
            <th>등록일</th>
            <th>{isQuestionPost ? '처리결과' : '조회수'}</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((post) => (
            <tr
              key={post.postId}
              className="border-y-[1px] hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/post/${post.postId}`)}
            >
              <td className="text-center py-3 hidden lg:block">{post.postId}</td>
              <td className="py-3">{post.title}</td>
              <td className="text-center hidden lg:block">{post?.user?.name}</td>
              <td className="text-center">
                {post.createDateTime?.slice(0, 10)}
              </td>
              <td className="text-center">
                {!isQuestionPost ? post.viewCount : <AnswerLabel post={post} />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="float-right w-24 bg-primary px-3 py-2 text-white ml-auto text-center rounded-md mt-10"
        onClick={() => router.push(window.location.href + '/create')}
      >
        {isQuestionPost ? '질문하기' : '작성하기'}
      </button>
    </div>
  );
}

export default Page;
