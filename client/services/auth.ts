import { User } from '@/model/user';
import { emptySplitApi } from './base';
export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const authApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.query<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
    getUserByToken: builder.query<User, void>({
      query: () => ({
        url: '/auth',
        method: 'GET',
      }),
      providesTags: ['User']
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation,  useLazyGetUserByTokenQuery, useLazyLogoutQuery } = authApi;
