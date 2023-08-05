import { Categories, Category } from '@/features/post/postSlice';
import { emptySplitApi } from './base';
import { Post } from '@/model/post';

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
    getPosts: builder.query<Post[], string>({
      query: (category) => ({
        url: `/posts?categoryId=${category}`,
      }),
      providesTags: ['Post', 'Category'],
    }),
    getPost: builder.query<Post, string>({
      query: (postId) => ({
        url: `posts/${postId}`,
      }),
      providesTags: ['Post'],
    }),
    addPost: builder.mutation<Post, FormData>({
      query: (formData) => ({
        url: 'post',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation<Post, { formData: FormData, postId: string }>({
      query: ({ formData, postId }) => ({
        url: `post/${postId}`,
        body: formData,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
    }),
    updatePostViewCount: builder.mutation<Post, string | number>({
      query: (postId) => ({
        url: `/post/viewcount/${postId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<Post, number | string>({
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
  useDeletePostMutation,
  useUpdatePostViewCountMutation
} = postApi;
