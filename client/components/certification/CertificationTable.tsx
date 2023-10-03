import { CertificationHistory, CertificationType } from '@/model/certification';
import React from 'react';
import TextBox from '../TextBox';

type CertificationTableProps = {
  certifications: CertificationHistory[];
};

function CertificationTable({ certifications }: CertificationTableProps) {
  return (
    <table className="min-w-[1300px] w-full mt-4 text-center">
      <thead>
        <tr className="bg-gray-100">
          <th className="border-gray-300 border-[1px] border-t-black py-3">
            순서
          </th>
          <th className="border-gray-300 border-[1px] border-t-black py-3">
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
                  ? '수료증'
                  : '이수증'}
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
            <td className="border-gray-300 border-[1px] py-3 w-24">
              <TextBox>{certification.issueNumber}</TextBox>
            </td>
            <td className="border-gray-300 border-[1px] py-3 w-[340px]">
              <TextBox>{certification.startDate}</TextBox>
              <span className="text-gray-400">~</span>
              <TextBox>{certification.endDate}</TextBox>
            </td>
            <td className="border-gray-300 border-[1px] py-3 w-56">
              <TextBox>{certification.title}</TextBox>
            </td>
            <td className="border-gray-300 border-[1px] py-3 w-36">
              <TextBox>{certification.certificationDate}</TextBox>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CertificationTable;
