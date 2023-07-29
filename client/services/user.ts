import { CreateUser, UpdateRegisterStatus, UpdateUser, User } from '@/model/user';
import { emptySplitApi } from './base';

export const userApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<User, string>({
      query: (email: string) => ({
        url: `/user/${email}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getUsersByQuery: builder.query<User[], { isActive?: boolean | string }>({
      query: ({ isActive = '' }) => ({
        url: `/user?isActive=${isActive}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    addUser: builder.mutation({
      query: (user: CreateUser) => ({
        url: '/user',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (user: UpdateUser & { userId: number | string }) => ({
        url: `/user/${user.userId}`,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    updateUsers: builder.mutation({
      query: (users: UpdateRegisterStatus[]) => ({
        url: '/user',
        method: 'PUT',
        body: users,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useAddUserMutation, useLazyGetUserQuery, useGetUserQuery, useGetUsersQuery, useGetUsersByQueryQuery, useUpdateUserMutation, useUpdateUsersMutation } = userApi;