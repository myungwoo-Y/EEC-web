import { File } from "@/model/file";
import { emptySplitApi } from "./base";

const fileApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    addFiles: builder.mutation<File[], FormData>({
      query: (data) => ({
        url: 'upload',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useAddFilesMutation } = fileApi;



