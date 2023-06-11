import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../server/src/model/post.entity';

export type Categories = { id: string; name: string }[];

type PostState = {
  categories: Categories;
  postsMap: {
    [key: string]: Partial<Post>[];
  };
};

type SetPost = {
  category: string;
  posts: Partial<Post>[];
}

const initialState: PostState = {
  categories: [],
  postsMap: {},
};

const slice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setCategories: (
      state,
      { payload: { categories } }: PayloadAction<PostState>
    ) => {
      state.categories = categories;
    },
    setPosts: (
      state,
      { payload: { category, posts} }: PayloadAction<SetPost>
    ) => {
      state.postsMap[category] = posts;
    }
  }
});


export const { setCategories, setPosts } = slice.actions;