'use client';

import UpdateLectureModal from '@/components/modal/UpdateLectureModal';
import LectureModal from '@/components/modal/LectureModal';
import Select from '@/components/Select';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { classOrderList } from '@/model/classOrder';
import { Lecture } from '@/model/lecture';
import { UserRole } from '@/model/user';
import { useGetClassesQuery } from '@/services/class';
import { useGetCurriculumsQuery } from '@/services/curriculum';
import { useGetLecturesQuery } from '@/services/lecture';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

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
  const currentCurriculum = curriculums?.[selectedCurriculumIdx];
  const { data: lectures } = useGetLecturesQuery(
    currentCurriculum?.curriculumId || 0,
    {
      skip: !currentCurriculum,
    }
  );

  const [isShowModal, setShowModal] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);

  const user = useSelector(selectCurrentUser);
  const isAdmin = user?.role === UserRole.ADMIN;

  return (
    <div className="">
      <div className="py-5 lg:py-10 px-3 lg:px-12 flex justify-between">
        <div className="flex">
          <p className="font-bold text-2xl">{currentClass?.title}</p>
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
      </div>
      {curriculums && curriculums.length > 0 && (
        <>
          <div className="flex mt-5 px-12 rounded-md border-b-[1px] border-gray-300">
            {curriculums.map((curriculum, idx) => (
              <button
                key={curriculum.curriculumId}
                className={`box-border hover:bg-gray-100 px-5 rounded-md`}
                onClick={() => setSelectedCurriculumIdx(idx)}
              >
                <div
                  className={`py-3 border-b-2 active:bg-gray-100 focus:bg-gray-100 border-b-white ${
                    selectedCurriculumIdx === idx
                      ? 'text-primary border-b-primary hover:border-b-primary'
                      : 'hover:border-b-gray-100'
                  }`}
                >
                  {curriculum.title}
                </div>
              </button>
            ))}
          </div>
          <div className="px-12">
            <table className="w-full mt-10">
              <tbody className="border-t-[1px] border-t-black">
                {lectures &&
                  lectures.map((lecture, idx) => (
                    <tr
                      key={idx+1}
                      className="border-[1px] border-t-0"
                    >
                      <td className="w-3 text-center py-12 px-5 text-lg text-gray-500">
                        {idx+1}
                      </td>
                      <td className="w-1/2 lg:w-2/3">
                        <div className="h-14 text-lg flex items-center break-words">
                          {lecture.title}
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="bg-primary text-white h-8 px-3 flex items-center justify-center rounded-md"
                            onClick={() => {
                              setShowModal(true);
                              setCurrentLecture(lecture);
                            }}
                          >
                            강의소개 및 강의자료
                          </button>
                          <button className="box-border border-[1px] border-gray- h-8 px-3 flex items-center justify-center rounded-md">
                            학습평가
                          </button>
                          <button className="box-border border-[1px] border-gray- h-8 px-3 flex items-center justify-center rounded-md">
                            강사평가
                          </button>
                        </div>
                      </td>
                      <td className="px-3">
                        <p>
                          [{lecture.curriculum?.class?.title}/
                          {lecture.curriculum?.title}]
                        </p>
                        <div>
                          <span className="mr-3">집필: {lecture.author}</span>
                          <span>강사:{lecture.lecturer}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {(isShowModal && currentLecture) && isAdmin && (
        <UpdateLectureModal
          lecture={currentLecture}
          closeModal={() => setShowModal(false)}
        />
      )}
      {(isShowModal && currentLecture) && !isAdmin && (
        <LectureModal
          lecture={currentLecture}
          closeModal={() => setShowModal(false)}
        />
      )}
      
    </div>
  );
}

export default Lectures;
