import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTokenToHeader, getBaseHost } from './common';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseHost()}`,
    prepareHeaders: (headers, { getState }) => {
      return addTokenToHeader(headers, getState);
    },
  }),
  endpoints: () => ({}),
});