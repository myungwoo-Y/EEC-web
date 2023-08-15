'use client';

import { toKoreaDate } from '@/lib/date';
import { useGetReportsQuery } from '@/services/report';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

function ReportsPage() {
  const router = useRouter();
  const { data: reports } = useGetReportsQuery();

  return (
    <div className="pt-4 lg:pt-10 px-2 lg:px-12">
      <div className="font-bold text-2xl">역학조사관 분기실적보고</div>
      <table className="w-full mt-10">
        <thead>
          <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-50">
            <th className="py-3 w-12">번호</th>
            <th className="">연도</th>
            <th className="w-12">분기</th>
            <th className="">소속</th>
            <th>성명</th>
            <th>제출일</th>
          </tr>
        </thead>
        <tbody>
          {reports?.map((report) => (
            <tr
              key={report.reportId}
              className="text-center border-t-[1px] border-b-[1px] border-gray-200 hover:bg-gray-50 cursor-pointer"
              onClick={() => router.push(`/report/${report.reportId}`)}
            >
              <td className="py-4">{report.reportId}</td>
              <td>{report.year}</td>
              <td>{report.quarter}</td>
              <td>{report.user.department}</td>
              <td>{report.user.name}</td>
              <td>{toKoreaDate(report.certificationDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="float-right w-24 bg-primary px-3 py-2 text-white ml-auto text-center rounded-md mt-10"
        onClick={() => router.push('/report/create')}
      >
        신규입력
      </button>
    </div>
  );
}

export default ReportsPage;
