import { toInputDate } from '@/lib/date';
import { getCertificationName } from '@/lib/user';
import { useGetCertificationAllQuery } from '@/services/admin';
import dayjs from 'dayjs';
import React from 'react';

function ResultTable() {
  const { data: certifications } = useGetCertificationAllQuery();
  return (
    <div>
      result table
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
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              관리
            </th>
          </tr>
        </thead>
        <tbody>
          {certifications?.map((certification, idx) => (
            <tr key={`${certification.certificationId}_${certification.userId}`}>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {idx+1}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {getCertificationName(certification.type)}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {certification.department}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {certification.jobLevel}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {certification.name}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {certification.issueNumber}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {toInputDate(certification.startDate)}
                <span className="mx-1">~</span>
                {toInputDate(certification.endDate)}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {certification.title}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                {toInputDate(certification.certificationDate)}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                <button
                  className="mx-auto px-3 py-1 text-center bg-red-500 text-white rounded-md"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
