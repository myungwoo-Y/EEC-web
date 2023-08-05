import { selectCurrentUser } from '@/features/auth/authSlice';
import { toInputDate } from '@/lib/date';
import { Comment } from '@/model/post';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import parse from 'html-react-parser';

type CommentProps = {
  comment: Comment
}

function CommentComponent({ comment }: CommentProps) {
  const user = useSelector(selectCurrentUser);
  const [isEdit, setIsEdit] = useState(false)
  
  return (
    <div
      className="border-b-[1px] border-gray-200 py-4"
      key={comment.commentId}
    >
      <div className="font-bold flex justify-between">
        <div>{comment.user.name}</div>
        {user?.userId === comment.user.userId && (
          <button 
            className="text-base font-medium border-[1px] border-gray-400 text-gray-500 rounded-md px-2 ml-3"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? '완료' : '수정'}
          </button>
        )}
      </div>
      <div className="mt-1 text-gray-600">{isEdit ? <Input type="text" /> : parse(comment.content)}</div>
      <div className="mt-1 text-gray-400 text-sm">
        {toInputDate(comment.createDateTime)}
      </div>
    </div>
  );
}

export default CommentComponent;
