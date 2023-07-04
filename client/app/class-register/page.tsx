"use client"

import { BookOpenIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page() {
  const router = useRouter();
  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">강의일정</div>
      <div className="w-full flex gap-6 mt-16">
        <div className="w-full flex justify-between border-b-2 border-gray-100 pb-4">
          <div className="flex">
            <div className="bg-gray-300 rounded-md w-64"></div>
            <div className="flex flex-col gap-1 ml-5 w-80">
              <p className="text-lg font-bold">기본교육 과정</p>
              <div className="flex">
                <div>
                  <div className="flex items-center">
                    <CalendarDaysIcon width={16} className="mr-1" /> 신청기간:
                  </div>
                  <p className="text-gray-400">2022.06.06~2022.06.17</p>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <BookOpenIcon width={16} className="mr-1" /> 구성: 26개 과목
                </div>
                <p className="text-gray-400">1. 가축전염병 대응(11개 과목)</p>
                <p className="text-gray-400">2. 역학 기초(9개 과목)</p>
                <p className="text-gray-400">3. 역학 실무(6개 과목)</p>
              </div>
            </div>
          </div>
          <button className="bg-green-400 rounded-md text-white px-2 h-9">
            신청하기
          </button>
        </div>
      </div>
      <button 
        className="bg-gray-400 rounded-md text-white px-3 py-2 float-right mt-14"
        onClick={() => router.push('/class-register/add')}
      >
        강의 추가하기
      </button>
    </div>
  );
}
