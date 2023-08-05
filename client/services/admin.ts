import { CertificationHistory } from './../model/certification';
import { emptySplitApi } from './base';
import { CertificationType } from '@/model/certification';
import { CertificationUser } from '@/model/user';
import { Application } from '@/model/application';
import { SendMessageDto } from '@/model/message';

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
      }),
      providesTags: ['Certification']
    }),
    removeCertification: builder.mutation<void, {certificationId: number, userId: number}>({
      query: (body) => ({
        url: '/certification/delete',
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Certification']
    }),
    getApplications: builder.query<Application[], { classId: number}>({
      query: ({ classId }) => ({
        url: `/application/${classId}`,
        method: 'GET'
      }),
      providesTags: ['Application']
    }),
    updateApplicationActivation: builder.mutation<void, { applicationId: number, isActive: boolean} []>({
      query: (body) => ({
        url: '/application/active',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Application']
    }),
  }),
});

export const {
  useSendSmsMutation,
  useCreateCertificationsMutation,
  useGetCertificationAllQuery,
  useRemoveCertificationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationActivationMutation,
} = messageApi;

