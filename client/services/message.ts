import { emptySplitApi } from './base';
import { SendMessageDto } from '../../server/src/msg/msg.dto';

const messageApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSms: builder.mutation<void, SendMessageDto[]>({
      query: (dtos) => ({
        url: '/message',
        body: dtos,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSendSmsMutation } = messageApi;

