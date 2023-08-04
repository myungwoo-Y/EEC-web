import { User } from '@/../server/src/model/user.entity';
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
    getUserByToken: builder.query<User, string>({
      query: (token) => ({
        url: '/auth',
        method: 'GET',
        headers: { authorization: `Bearer ${token}` },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation,  useLazyGetUserByTokenQuery, useGetUserByTokenQuery } = authApi;
