import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../../server/src/model/post.entity';
export type Category = { name: string; category_id: number };
export type Categories = Category[];
export type PostClient = Omit<Post, 'createDateTime'> & { createDateTime: string }
export type Posts = Partial<PostClient>[];

type PostState = {
  categories: Categories;
  postsMap: {
    [key: string]: Posts;
  };
};

type SetPost = {
  category: string;
  posts: Posts;
};

type SetCategories = {
  categories: Categories;
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
      { payload: { categories } }: PayloadAction<SetCategories>
    ) => {
      state.categories = categories;
    },
    setPosts: (
      state,
      { payload: { category, posts } }: PayloadAction<SetPost>
    ) => {
      state.postsMap[category] = posts;
    },
  },
});

export const { setCategories, setPosts } = slice.actions;

export default slice.reducer;

export const selectCurrentCategoryName =
  (categoryId: number) => (state: RootState) =>
    state.posts.categories.filter(
      (category) => category.category_id === categoryId
    )[0]?.name;