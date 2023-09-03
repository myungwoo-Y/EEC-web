import { BaseEntity } from "./common";
import { File } from "./file";
import { User } from "./user";

export type Post = {
  postId: number;

  content: string;

  title: string;

  viewCount: number;

  isAnswer: boolean;

  isOpen: boolean;

  user: User;

  category: PostCategory;

  files: File[]

  comments: Comment[];
} & BaseEntity;

type PostCategory = {
  categoryId: number
  
  name: string
} & BaseEntity;

export type Comment = {
  commentId: string;

  content: string;

  user: User;

  post: Post;
} & BaseEntity;

export type CreatePost = {
  title: string;

  content: string;

  categoryId: number;

  files: File[];

  isOpen: boolean;
}
