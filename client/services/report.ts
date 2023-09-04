import { MutateReport, Report } from '@/model/report';
import { emptySplitApi } from './base';

const lectureApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addReport: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/report',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['Report'],
    }),
    updateReport: builder.mutation<void, MutateReport>({
      query: (report) => ({
        url: `/report/${report.reportId}`,
        body: report,
        method: 'PUT',
      }),
      invalidatesTags: ['Report'],
    }),
    getReports: builder.query<Report[], void>({
      query: () => ({
        url: '/report',
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
    getReport: builder.query<Report, number | string>({
      query: (reportId) => ({
        url: `/report/${reportId}`,
        method: 'GET',
      }),
      providesTags: ['Report'],
    }),
  }),
});

export const { useAddReportMutation, useGetReportsQuery, useUpdateReportMutation, useGetReportQuery } = lectureApi;
