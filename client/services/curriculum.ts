import { Curriculum, NewCurriculum, UpdateCurriculums } from '@/model/curriculum';
import { emptySplitApi } from './base';

const curriculumApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addCurriculum: builder.mutation<Curriculum, NewCurriculum>({
      query: (newCurriculum) => ({
        url: '/curriculum',
        body: newCurriculum,
        method: 'POST',
      }),
      invalidatesTags: ['Curriculum'],
    }),
    getCurriculums: builder.query<
      Curriculum[],
      { classId: number | string; classOrder?: number | string }
    >({
      query: ({ classId, classOrder = '' }) => ({
        url: `/curriculum?classId=${classId}&classOrder=${classOrder}`,
        method: 'GET',
      }),
      providesTags: ['Curriculum'],
    }),
    updateCurriculums: builder.mutation<
      Curriculum,
      UpdateCurriculums
    >({
      query: (body) => ({
        url: `/curriculum`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Curriculum']
    }),
    deleteCurriculum: builder.mutation<Curriculum, number>({
      query: (curriculumId) => ({
        url: `/curriculum/${curriculumId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Curriculum']
    })
  }),
});

export const { useAddCurriculumMutation, useGetCurriculumsQuery, useUpdateCurriculumsMutation, useDeleteCurriculumMutation } = curriculumApi;
