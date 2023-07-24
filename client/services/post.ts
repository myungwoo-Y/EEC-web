import { Categories, Category, Posts } from '@/features/post/postSlice';
import { emptySplitApi } from './base';
import { PostClient } from '../features/post/postSlice';

export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, any>({
      query: () => ({
        url: 'categories',
      }),
      providesTags: ['Lecture'],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => ({
        url: `categories/${id}`,
      }),
      providesTags: ['Lecture'],
    }),
    getPosts: builder.query<Posts, string>({
      query: (category) => ({
        url: `posts?categoryId=${category}`,
      }),
      providesTags: ['Lecture'],
    }),
    getPost: builder.query<PostClient, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
      }),
      providesTags: ['Lecture'],
    }),
    addPost: builder.mutation<PostClient, FormData>({
      query: (formData) => ({
        url: 'post',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['Lecture'],
    }),
    updatePost: builder.mutation<PostClient, { formData: FormData, postId: string }>({
      query: ({ formData, postId }) => ({
        url: `post/${postId}`,
        body: formData,
        method: 'PUT',
      }),
      invalidatesTags: ['Lecture'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetPostQuery,
  useGetCategoryByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation
} = postApi;
