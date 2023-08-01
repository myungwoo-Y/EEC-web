import { CertificationHistory } from './../model/certification';
import { emptySplitApi } from './base';
import { SendMessageDto } from '../../server/src/msg/msg.dto';
import { CertificationType } from '@/model/certification';
import { CertificationUser } from '@/model/user';

const messageApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    sendSms: builder.mutation<void, SendMessageDto[]>({
      query: (dtos) => ({
        url: '/message',
        body: dtos,
        method: 'POST',
      }),
    }),
    createCertifications: builder.mutation<{ data: Iterable<number> }, {
      certificationType: CertificationType,
      users: CertificationUser[]
    }>({
      query: ({certificationType, users}) => ({
        url: `/certification/${certificationType}`,
        body: users,
        method: 'POST',
      }),
    }),
    getCertificationAll: builder.query<CertificationHistory[], void>({
      query: () => ({
        url: '/certification',
        method: 'GET'
      })
    })
  }),
});

export const { useSendSmsMutation, useCreateCertificationsMutation, useGetCertificationAllQuery } = messageApi;

