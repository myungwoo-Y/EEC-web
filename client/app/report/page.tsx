'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

function ReportsPage() {
  const router = useRouter()
  
  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">역학조사관 분기실적보고</div>
      <table className="w-full mt-10">
        <thead>
          <tr className="border-t-2 border-t-black border-b-[1px] bg-gray-50">
            <th className="py-3">번호</th>
            <th>연도</th>
            <th>분기</th>
            <th className="w-96">소속</th>
            <th>성명</th>
            <th>제출일</th>
          </tr>
        </thead>
        <tbody></tbody>
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