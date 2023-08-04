import { Class } from "@/model/class";
import { emptySplitApi } from "./base";

const classApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addClass: builder.mutation<Class, FormData>({
      query: (formData) => ({
        url: 'class',
        body: formData,
        method: 'POST',
      }),
      invalidatesTags: ['Class']
    }),
    getClasses: builder.query<Class[], void>({
      query: () => ({
        url: 'class',
        method: 'GET'
      }),
      providesTags: ['Class']
    }),
    getClass: builder.query<Class, string>({
      query: (id) => ({
        url: `class/${id}`,
        method: 'GET'
      }),
      providesTags: ['Class']
    }),
    updateClass: builder.mutation<Class[], {formData: FormData, classId: string}>({
      query: ({formData, classId}) => ({
        url: `class/${classId}`,
        method: 'PUT',
        body: formData
      }),
      invalidatesTags: ['Class']
    })
  }),
});

export const { useAddClassMutation, useGetClassesQuery, useGetClassQuery, useUpdateClassMutation } = classApi;