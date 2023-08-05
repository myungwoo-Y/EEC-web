import { selectCurrentUser } from '@/features/auth/authSlice';
import { toInputDate } from '@/lib/date';
import { Comment } from '@/model/post';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import parse from 'html-react-parser';
import { useDeleteCommentMutation, useUpdateCommentMutation } from '@/services/post';

type CommentProps = {
  comment: Comment;
};

function CommentComponent({ comment }: CommentProps) {
  const user = useSelector(selectCurrentUser);
  const [content, setContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [updateComment, { isSuccess: isUpdateCommentSuccess }] = useUpdateCommentMutation();
  const [deleteComment, { isSuccess: isDeleteCommentSuccess}] = useDeleteCommentMutation();

  useEffect(() => {
    if (isEdit) {
      setContent(comment.content);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isUpdateCommentSuccess) {
      alert('수정을 완료했습니다.');
      setIsEdit(false);
    }
  }, [isUpdateCommentSuccess]);

  useEffect(() => {
    if (isDeleteCommentSuccess) {
      alert('삭제를 완료했습니다.');
    }
  }, [isDeleteCommentSuccess]);

  const onUpdate = () => {
    updateComment({
      commentId: comment.commentId,
      content,
    });
  };

  const onDelete = () => {
    if (confirm('삭제하시겠습니까?')) {
      deleteComment(comment.commentId);
    }
  }

  return (
    <div
      className="border-b-[1px] border-gray-200 py-4"
      key={comment.commentId}
    >
      <div className="font-bold flex justify-between">
        <div>{comment.user.name}</div>
        {user?.userId === comment.user.userId && (
          <div>
            <button
              className="text-base font-medium border-[1px] border-gray-400 text-gray-500 rounded-md px-2"
              onClick={() => {
                if (isEdit && content !== comment.content) {
                  onUpdate();
                  return;
                }
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? '완료' : '수정'}
            </button>
            <button 
              className="text-base font-medium border-[1px] border-gray-400 text-gray-500 rounded-md px-2 ml-2"
              onClick={onDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      <div className="mt-1 text-gray-600">
        {isEdit ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border-gray-200 border-2 appearance-none mt-2 p-2 rounded-md active:border-primary resize-none h-24"
          />
        ) : (
          parse(comment.content)
        )}
      </div>
      <div className="mt-1 text-gray-400 text-sm">
        {toInputDate(comment.createDateTime)}
      </div>
    </div>
  );
}

export default CommentComponent;
