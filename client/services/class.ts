import Class from "@/../server/src/model/class.entity";
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
    })
  }),
});

export const { useAddClassMutation, useGetClassesQuery } = classApi;