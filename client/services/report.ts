import { Lecture, NewLecture, UpdateLectures } from '@/model/lecture';
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
  }),
});

export const { useAddReportMutation } = lectureApi;
