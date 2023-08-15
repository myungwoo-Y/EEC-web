'use client';

import AnswerLabel from '@/components/AnswerLabel';
import Comments from '@/components/Comments';
import Download from '@/components/Download';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { isQuestion } from '@/lib/category';
import { UserRole } from '@/model/user';
import {
  useAnswerPostMutation,
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostViewCountMutation,
} from '@/services/post';
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
  const [deletePost, { isSuccess: isPostDeleteSuccess }] =
    useDeletePostMutation();
  const [updatePostViewCount] = useUpdatePostViewCountMutation();
  const [answerPost, { isSuccess: isAnswerSuccess }] = useAnswerPostMutation();
  const isQuestionPost = isQuestion(data?.category.name);
  const isAdmin = user?.role === UserRole.ADMIN;

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editable: false,
  });

  useEffect(() => {
    if (data) {
      updatePostViewCount(data.postId);
    }
  }, [data]);

  useEffect(() => {
    editor?.commands.setContent(data?.content || '');
  }, [data, editor]);

  useEffect(() => {
    if (isPostDeleteSuccess) {
      router.push(`category/${data?.category.categoryId}`);
      alert('삭제를 완료했습니다.');
    }
  }, [isPostDeleteSuccess]);

  useEffect(() => {
    if (isAnswerSuccess) {
      alert('답변을 완료처리했습니다.');
    }
  }, [isAnswerSuccess]);

  const onClickUpdate = () => {
    router.push(`/post/${postId}/update`);
  };

  const onDelete = (postId: number | string) => {
    if (confirm('삭제하시겠습니까?')) {
      deletePost(postId);
    }
  };

  if (!data) {
    return null;
  }

  return (
    <div className="lg:pt-10 px-3 lg:px-12 mt-5 lg:mt-0">
      <div className="font-bold text-2xl w-full flex justify-between">
        {data?.category.name}
        <div className="flex gap-2">
          {isAdmin && isQuestionPost && data && !data?.isAnswer && (
            <button
              className="text-base bg-green-600 rounded-md text-white p-2 font-semibold"
              onClick={() => answerPost(data.postId)}
            >
              답변완료
            </button>
          )}
          {(isAdmin || data?.user.userId === user?.userId) && (
            <>
              <button
                className="text-base bg-red-600 rounded-md text-white p-2 font-semibold"
                onClick={() => onDelete(data?.postId ?? '')}
              >
                삭제하기
              </button>
              <button
                className="text-base bg-gray-400 rounded-md text-white p-2 font-semibold"
                onClick={onClickUpdate}
              >
                업데이트
              </button>
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-100 py-4 flex items-center border-t-[1px] border-t-black mt-10">
        <div className="w-full items-center text-xl font-semibold text-center">
          {data?.title}
        </div>
        <div className="flex-shrink-0 pr-4 flex items-center">
          <div>
            {isQuestionPost && data && (
              <AnswerLabel className="mx-2" post={data} />
            )}
          </div>
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
        {data && <Comments postId={data.postId} comments={data.comments ?? []} />}
      </div>
    </div>
  );
}

export default Post;
