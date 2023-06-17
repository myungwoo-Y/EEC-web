"use client"

import { useGetPostQuery } from '@/services/post';
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

function Post({ params: { slug: postId } }: Props) {
  const { data } = useGetPostQuery(postId);
  return (
    <div>
      <div>{data?.title}</div>
      <div>{data?.content}</div>
    </div>
  )
}

export default Post
