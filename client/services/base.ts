import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTokenToHeader, getBaseHost } from './common';

const isProd = process.env.NODE_ENV === 'production';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Curriculum', 'Lecture', 'Post', 'User', 'Certification', 'Class', 'Application', 'Category', 'Report'],
  baseQuery: fetchBaseQuery({
    // baseUrl: `${getBaseHost()}`,
    baseUrl: isProd ? 'https://api.kfvetp.com' : `http://localhost:8080`,
    prepareHeaders: (headers, { getState }) => {
      return addTokenToHeader(headers, getState);
    },
  }),
  endpoints: () => ({}),
});
