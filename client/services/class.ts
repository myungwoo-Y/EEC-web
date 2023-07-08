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
    }),
    getClasses: builder.query<Class[], void>({
      query: () => ({
        url: 'class',
        method: 'GET'
      }),
    }),
    getClass: builder.query<Class, string>({
      query: (id) => ({
        url: `class/${id}`,
        method: 'GET'
      }),
    }),
    updateClass: builder.mutation<Class[], {formData: FormData, classId: string}>({
      query: ({formData, classId}) => ({
        url: `class/${classId}`,
        method: 'PUT',
        body: formData
      }),
    })
  }),
});

export const { useAddClassMutation, useGetClassesQuery, useGetClassQuery, useUpdateClassMutation } = classApi;