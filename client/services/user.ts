import { User } from '@/../server/src/model/user.entity';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { addTokenToHeader, getBaseHost } from './common';

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseHost()}/user`,
    prepareHeaders: (headers, { getState }) => {
      addTokenToHeader(headers, getState);
    },
  }),
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (user: Partial<User>) => ({
        url: '/',
        method: 'POST',
        body: user
      })
    })
  })
});

export const { useAddUserMutation } = userApi;
