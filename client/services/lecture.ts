import Curriculum from '@/../server/src/model/curriculum.entity';
import { NewCurriculum, UpdateCurriculums } from '@/model/curriculum';
import { Lecture, NewLecture, UpdateLectures } from '@/model/lecture';
import { emptySplitApi } from './base';

const lectureApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addLecture: builder.mutation<Lecture, NewLecture>({
      query: (newCurriculum) => ({
        url: '/lecture',
        body: newCurriculum,
        method: 'POST',
      }),
      invalidatesTags: ['Lecture'],
    }),
    getLectures: builder.query<
      Lecture[],
      number
    >({
      query: (curriculumId) => ({
        url: `/lecture?curriculumId=${curriculumId}`,
        method: 'GET',
      }),
      providesTags: ['Lecture'],
    }),
    updateLectures: builder.mutation<
      Curriculum,
      UpdateLectures
    >({
      query: (body) => ({
        url: `/lecture`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Lecture']
    }),
    deleteLecture: builder.mutation<Lecture, number>({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Lecture']
    })
  }),
});

export const { useAddLectureMutation, useGetLecturesQuery, useUpdateLecturesMutation, useDeleteLectureMutation } = lectureApi;
