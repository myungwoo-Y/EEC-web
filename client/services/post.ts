import { Categories, Category } from '@/features/post/postSlice';
import { emptySplitApi } from './base';
import { Post } from '@/model/post';

export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, void>({
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
    getPosts: builder.query<Post[], string | number>({
      query: (category) => ({
        url: `/posts?categoryId=${category}`,
      }),
      providesTags: ['Post', 'Category'],
    }),
    getPost: builder.query<Post, string | number>({
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
    answerPost: builder.mutation<Post, number | string>({
      query: (postId) => ({
        url: `post/answer/${postId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Post'],
    }),
    addComment: builder.mutation<Post, { content: string, userId: number | string, postId: number }>({
      query: (body) => ({
        url: '/comment',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Post'],
    }),
    updateComment: builder.mutation<Post, { content: string, commentId: string }>({
      query: (body) => ({
        url: '/comment/content',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Post'],
    }),
    deleteComment: builder.mutation<Post, string>({
      query: (commentId) => ({
        url: `/comment/${commentId}`,
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
  useUpdatePostViewCountMutation,
  useAnswerPostMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetPostsQuery
} = postApi;
