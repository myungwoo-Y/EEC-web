import { Categories, Category, Posts } from '@/features/post/postSlice';
import { emptySplitApi } from './base';
import { PostClient } from '../features/post/postSlice';

export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, any>({
      query: () => ({
        url: 'categories',
      }),
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => ({
        url: `categories/${id}`,
      }),
      providesTags: ['Category'],
    }),
    getPosts: builder.query<Posts, string>({
      query: (category) => ({
        url: `/posts?categoryId=${category}`,
      }),
      providesTags: ['Post', 'Category'],
    }),
    getPost: builder.query<PostClient, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
      }),
      providesTags: ['Post'],
    }),
    addPost: builder.mutation<PostClient, FormData>({
      query: (formData) => ({
        url: 'post',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<PostClient, { formData: FormData, postId: string }>({
      query: ({ formData, postId }) => ({
        url: `post/${postId}`,
        body: formData,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<PostClient, number | string>({
      query: (postId) => ({
        url: `post/${postId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetPostQuery,
  useGetCategoryByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
} = postApi;
