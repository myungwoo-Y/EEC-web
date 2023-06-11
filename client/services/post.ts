import { Categories } from '@/features/post/postSlice';
import { emptySplitApi } from './base';

export const postApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Categories, any>({
      query: () => ({
        url: 'post/categories',
      }),
    }),
  }),
});


export const { useGetCategoriesQuery } = postApi;