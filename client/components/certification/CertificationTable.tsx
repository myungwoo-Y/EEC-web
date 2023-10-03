'use client';

import { toKoreaDate } from '@/lib/date';
import { CertificationHistory, CertificationType } from '@/model/certification';
import React from 'react';
import Button from '../Button';
import { User } from '@/model/user';
import { useLazyGetUserCertificationPdfQuery } from '@/services/user';
import configMap from '@/lib/configMap';

type CertificationTableProps = {
  certifications: CertificationHistory[];
  user: User | null
};

function CertificationTable({ certifications, user }: CertificationTableProps) {
  const [downloadPdf] = useLazyGetUserCertificationPdfQuery();
  const onDownload = (certification: CertificationHistory) => {
    window.location.href = `${configMap.serverUrl}/certification/${certification.certificationId}/user/${user?.userId}`
  }
  return (
    <table className="w-full min-w-[1000px] mt-4 text-center">
      <thead>
        <tr className="bg-gray-100">
          <th className="border-gray-300 border-[1px] border-t-black py-3 w-12">
            순서
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3 w-14">
            구분
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            소속
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            직급
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            이름
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            발급번호
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            교육기간
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            교육제목
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            발급일
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            관리
          </th>
        </tr>
      </thead>
      <tbody>
        {certifications.map((certification, idx) => (
          <tr key={certification.certificationId}>
            <td className="border-gray-300 border-[1px] py-3">
              <p className="text-center">{idx + 1}</p>
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              <p className="text-center">
                {certification.type === CertificationType.Course
                  ? '이수증'
                  : '수료증'}
              </p>
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              <p className="text-center">{certification.department}</p>
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              <p className="text-center">{certification.jobLevel}</p>
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              <p className="text-center">{certification.name}</p>
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              {certification.issueNumber}
            </td>
            <td className="border-gray-300 border-[1px] py-3 w-[340px]">
              {toKoreaDate(certification.startDate)}
              <span className="text-gray-400"> ~ </span>
              {toKoreaDate(certification.endDate)}
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              {certification.title}
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              {toKoreaDate(certification.certificationDate)}
            </td>
            <td className="border-gray-300 border-[1px] py-3">
              <Button onClick={() => onDownload(certification)}>발급하기</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CertificationTable;
