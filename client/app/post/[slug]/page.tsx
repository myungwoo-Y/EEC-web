'use client';

import Download from '@/components/Download';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { downloadFile } from '@/lib/downloadFile';
import { useDeletePostMutation, useGetPostQuery } from '@/services/post';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  params: {
    slug: string;
  };
};

function Post({ params: { slug: postId } }: Props) {
  const { data } = useGetPostQuery(postId);
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const [deletePost, { isSuccess: isPostDeleteSuccess}] = useDeletePostMutation();

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editable: false,
  });

  useEffect(() => {
    editor?.commands.setContent(data?.content || '');
  }, [data, editor]);

  useEffect(() => {
    if (isPostDeleteSuccess) {
      alert('삭제를 완료했습니다.')
      router.push(`category/${data?.category.categoryId}`)
    }
  }, [isPostDeleteSuccess])

  const onClickUpdate = () => {
    router.push(`/post/${postId}/update`);
  };

  const onDelete = (postId: number | string) => {
    if (confirm('삭제하시겠습니까?')) {
      deletePost(postId);
    }
  }

  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl w-full flex justify-between">
        {data?.category.name}
        <div className="flex gap-2">
          {data?.user.userId === user?.userId && (
            <button
              className="text-base bg-red-500 rounded-md text-white p-2 font-semibold"
              onClick={() => onDelete(data?.postId ?? '')}
            >
              삭제하기
            </button>
          )}
          <button
            className="text-base bg-gray-400 rounded-md text-white p-2 font-semibold"
            onClick={onClickUpdate}
          >
            업데이트
          </button>
        </div>
      </div>
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
      {!!data?.files.length && (
        <div className="border-y-[1px] border-x-[1px] border-gray-200 px-4 py-4">
          {data?.files.map((file) => (
            <Download
              key={file.fileId}
              fileName={file.filename}
              path={file.path}
            />
          ))}
        </div>
      )}
      <div className="border-y-[1px] border-x-[1px] border-gray-200 px-4 py-4">
        <EditorContent editor={editor} />
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
        <div className="bg-primary text-white rounded-md py-3 text-center mt-2">
          댓글쓰기
        </div>
      </div>
      <div className="mt-12">
        <div className="border-b-[1px] border-gray-200 pb-4">
          <div className="font-bold">양명우</div>
          <div className="mt-1 text-gray-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </div>
          <div className="mt-1 text-gray-400 text-sm">2023-06-15</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
