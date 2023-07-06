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
  }),
});

export const { useAddClassMutation } = classApi;