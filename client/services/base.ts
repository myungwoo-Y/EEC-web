import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTokenToHeader } from './common';
import configMap from '@/lib/configMap';

// initialize an empty api service that we'll inject endpoints into later as needed
export const emptySplitApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Curriculum', 'Lecture', 'Post', 'User', 'Certification', 'Class', 'Application', 'Category', 'Report'],
  baseQuery: fetchBaseQuery({
    baseUrl: configMap.serverUrl,
    prepareHeaders: (headers, { getState }) => {
      return addTokenToHeader(headers, getState);
    },
  }),
  endpoints: () => ({}),
});
