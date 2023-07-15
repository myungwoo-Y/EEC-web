'use client';

import CreateLectureModal from '@/components/CreateLectureModal';
import Select from '@/components/Select';
import { classOrderList } from '@/model/classOrder';
import { useGetClassesQuery } from '@/services/class';
import { useGetCurriculumsQuery } from '@/services/curriculum';
import React, { useState } from 'react';

interface LecturesProps {
  params: {
    classId: string;
  };
}

function Lectures({ params: { classId } }: LecturesProps) {
  const { data: classes } = useGetClassesQuery();
  const currentClass =
    classes?.find((data) => data.classId === parseInt(classId)) || null;
  const [currentClassOrder, setCurrentClassOrder] = useState('0');
  const { data: curriculums } = useGetCurriculumsQuery(
    {
      classOrder: parseInt(currentClassOrder),
      classId: currentClass?.classId || 0,
    },
    { skip: !currentClassOrder || currentClassOrder === '0' || !currentClass }
  );
  const [selectedCurriculumIdx, setSelectedCurriculumIdx] = useState(0);

  if (!currentClass) {
    return null;
  }

  return (
    <div className="">
      <div className="pt-10 px-12 flex justify-between">
        <div className="flex">
          <p className="font-bold text-2xl">{currentClass.title}</p>
          <Select
            className="ml-3 w-28"
            onChange={(e) => setCurrentClassOrder(e.target.value)}
          >
            <option value="" disabled>
              기수 선택
            </option>
            {classOrderList.map((classOrder, idx) => (
              <option key={idx} value={idx + 1}>
                {classOrder}
              </option>
            ))}
          </Select>
        </div>
        <button className="bg-primary px-4 py-2 text-center text-white rounded-md float-right">강의추가하기</button>
      </div>
      {curriculums && (
        <>
          <div className="flex mt-5 px-12 rounded-md border-b-[1px] border-gray-300">
            {curriculums.map((curriculum, idx) => (
              <div
                key={curriculum.curriculumId}
                className={`box-border hover:bg-gray-100 px-5 rounded-md`}
              >
                <button
                  className={`py-3 border-b-2 border-b-white ${
                    selectedCurriculumIdx === idx
                      ? 'text-primary border-b-primary hover:border-b-primary'
                      : 'hover:border-b-gray-100'
                  }`}
                  onClick={() => setSelectedCurriculumIdx(idx)}
                >
                  {curriculum.title}
                </button>
              </div>
            ))}
          </div>
          <div className="pt-10 px-12">
            
          </div>
        </>
      )}
      <CreateLectureModal />
    </div>
  );
}

export default Lectures;
