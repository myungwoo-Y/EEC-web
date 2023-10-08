'use client';

import ViewEditor from '@/components/ViewEditor';
import { toKrDate } from '@/lib/date';
import { Class } from '@/model/class';
import { useGetClassQuery } from '@/services/class';
import React from 'react';

type ClassProps = {
  params: {
    classId: string;
  };
};

function ClassPage({ params: { classId } }: ClassProps) {
  const { data } = useGetClassQuery(classId);

  return (
    <div className="py-5 lg:py-10 px-3 lg:px-12">
      {data && (
        <div className="flex flex-col gap-4 mx-auto lg:w-[800px]">
          <p className="font-bold text-2xl">{data.title}</p>
          <div>
            <div className="bm-1">강의 이름</div>
            <div className="border-[1px] border-gray-300 rounded-md py-1 px-3 focus:bg-white focus:border-primary w-full">
              {data.title}
            </div>
          </div>
          <div>
            <div className="bm-1">교육 대상</div>
            <div className="border-[1px] border-gray-300 rounded-md py-1 px-3 focus:bg-white focus:border-primary w-full">
              {data.target}
            </div>
          </div>
          <div>
            <div className="bm-1">교육기간</div>
            <div className="flex justify-between w-fit gap-2">
              <span className="border-[1px] border-gray-300 rounded-md py-1 w-[150px] text-center">{toKrDate(data.classStart)}</span> 
              <span>~</span>
              <span className="border-[1px] border-gray-300 rounded-md py-1 w-[150px] text-center">{toKrDate(data.classEnd)}</span>
            </div>
          </div>
          <div>
            <div className="bm-1">신청기간</div>
            <div className="flex justify-between w-fit gap-2">
              <span className="border-[1px] border-gray-300 rounded-md py-1 w-[150px] text-center">{toKrDate(data.registerStart)}</span> 
              <span>~</span>
              <span className="border-[1px] border-gray-300 rounded-md py-1 w-[150px] text-center">{toKrDate(data.registerEnd)}</span>
            </div>
          </div>
          <div className="w-full">
            <p>구성 설명</p>
            <div className="resize-y w-full border-[1px] py-1 px-2 rounded-md focus:border-primary h-44 mt-1 whitespace-break-spaces">
              {data.description}
            </div>
          </div>
          <div className="w-full mt-4">
            <p>교과목상세</p>
            <ViewEditor content={data.detail} className="w-full mt-1" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ClassPage;
