import Curriculum from '@/../server/src/model/curriculum.entity';
import { NewCurriculum } from '@/model/curriculum';
import { emptySplitApi } from './base';

const curriculumApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addCurriculum: builder.mutation<Curriculum, NewCurriculum>({
      query: (newCurriculum) => ({
        url: '/curriculum',
        body: newCurriculum,
        method: 'POST',
      }),
    }),
    getCurriculums: builder.query<Curriculum, {classId: number, classOrder: number}>({
      query: ({classId, classOrder}) => ({
        url: `/curriculum?classId=${classId}&classOrder=${classOrder}`,
        method: 'GET'
      })
    })
  }),
});

export const { useAddCurriculumMutation, useGetCurriculumsQuery } = curriculumApi;
