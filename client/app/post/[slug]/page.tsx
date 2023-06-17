'use client';

import { useGetPostQuery } from '@/services/post';
import React from 'react';

type Props = {
  params: {
    slug: string;
  };
};

function Post({ params: { slug: postId } }: Props) {
  const { data } = useGetPostQuery(postId);
  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">{data?.category.name}</div>
      <div className="bg-gray-100 py-4 flex items-center border-t-[1px] border-t-black mt-10">
        <div className="w-full text-xl font-semibold text-center">
          {data?.title}
        </div>
        <div className="flex-shrink-0 pr-4">
          {data?.createDateTime.substr(0, 10)}
        </div>
      </div>
      <div className="border-t-[1px] border-x-[1px] border-gray-200 px-4 py-2">
        작성자: {data?.user.name}
      </div>
      <div className="border-y-[1px] border-x-[1px] border-gray-200 px-4 py-2">
        {data?.content}
      </div>
      <div className="mt-12">
        <textarea
          id="story"
          name="story"
          rows={5}
          cols={20}
          className="w-full border-gray-200 border-2 appearance-none mt-10 p-2 rounded-md active:border-primary resize-none h-24"
          placeholder="댓글을 입력해주세요"
        ></textarea>
        <div className="bg-primary text-white rounded-md py-3 text-center mt-2">댓글쓰기</div>
      </div>
      <div className="mt-12">
        <div className="border-b-[1px] border-gray-200 pb-4">
          <div className="font-bold">양명우</div>
          <div className="mt-1 text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          </div>
          <div className="mt-1 text-gray-400 text-sm">2023-06-15</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
