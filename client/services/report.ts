import { Report } from '@/model/report';
import { emptySplitApi } from './base';

const lectureApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addReport: builder.mutation<void, FormData>({
      query: (forData) => ({
        url: '/report',
        body: forData,
        method: 'POST',
      }),
      invalidatesTags: ['Report'],
    }),
    getReports: builder.query<Report[], void>({
      query: (forData) => ({
        url: '/report',
        body: forData,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
  }),
});

export const { useAddReportMutation, useGetReportsQuery } = lectureApi;
