import { selectCurrentUser } from '@/features/auth/authSlice';
import { toInputDate } from '@/lib/date';
import { Comment } from '@/model/post';
import { UserRole } from '@/model/user';
import { useAddCommentMutation } from '@/services/post';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentComponent from './Comment';

type CommentsProps = {
  comments: Comment[];
  postId: number;
};

function Comments({ comments, postId }: CommentsProps) {
  const [content, setContent] = useState('')
  const [addComment, { isSuccess: isCommentAddSuccess }] = useAddCommentMutation();
  const user = useSelector(selectCurrentUser);
  const isAdmin = user?.role === UserRole.ADMIN;

  useEffect(() => {
    if (isCommentAddSuccess) {
      alert('작성을 완료했습니다.');
      setContent('');
    }
  }, [isCommentAddSuccess]);

  const onAddComment = () => {
    addComment({
      content: content.replace(/\r?\n/g, '<br />'),
      userId: user?.userId ?? '',
      postId
    })
  }

  return (
    <>
      <div className="mt-12 mb-6">
        <textarea
          id="story"
          name="story"
          rows={5}
          cols={20}
          className="w-full border-gray-200 border-2 appearance-none mt-10 p-2 rounded-md active:border-primary resize-none h-24"
          placeholder="댓글을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          className="bg-primary text-white rounded-md py-3 text-center mt-2 w-full"
          onClick={onAddComment}
        >
          {isAdmin ? '답변작성' : '댓글작성'}
        </button>
      </div>
      {comments.map((comment) => (
        <CommentComponent key={comment.commentId} comment={comment} />
      ))}
    </>
  );
}

export default Comments;
