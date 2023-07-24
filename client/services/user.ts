import { User } from '@/../server/src/model/user.entity';
import { emptySplitApi } from './base';

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (email: string) => ({
        url: `/user/${email}`,
        method: 'GET',
      }),
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
    addUser: builder.mutation({
      query: (user: Partial<User>) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useAddUserMutation, useLazyGetUserQuery, useGetUserQuery, useGetUsersQuery } = userApi;