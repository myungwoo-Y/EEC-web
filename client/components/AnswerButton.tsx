import { Post } from '@/model/post';
import classNames from 'classnames';
import React from 'react'

type AnswerButtonProps = {
  post: Post
  className?: string;
  onClick?: () => void
}

function AnswerButton({ post, onClick, className = '' }: AnswerButtonProps) {
  return (
    <button 
      className={classNames(`${post.isAnswer ? 'border-primary text-primary' : 'border-red-500 text-red-500'} border-[1px] text-center py-1 px-2 rounded-md`, className)}
      onClick={() => onClick && onClick()}
    >
      {post.isAnswer ? '답변완료' : '미답변'}
    </button>
  )
}

export default AnswerButton
