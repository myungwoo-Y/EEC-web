import { Lecture, NewLecture, UpdateLecture, UpdateLectures } from '@/model/lecture';
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
      Lecture,
      UpdateLectures
    >({
      query: (body) => ({
        url: `/lecture/init`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Lecture']
    }),
    updateLecture: builder.mutation<
      Lecture,
      UpdateLecture
    >({
      query: (lecture) => ({
        url: `/lecture/${lecture.lectureId}`,
        method: 'PUT',
        body: lecture
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

export const { useAddLectureMutation, useGetLecturesQuery, useUpdateLecturesMutation, useDeleteLectureMutation, useUpdateLectureMutation } = lectureApi;
