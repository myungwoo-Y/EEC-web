'use client'

import { selectCurrentUser } from '@/features/auth/authSlice';
import { UpdateLectures } from '@/model/lecture';
import { useAddLectureMutation, useDeleteLectureMutation, useGetLecturesQuery, useUpdateLecturesMutation } from '@/services/lecture';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../Input';

type LectureManagement = {
  curriculumId: number;
};

function LectureManagement({ curriculumId }: LectureManagement) {
  const { data: lectures } = useGetLecturesQuery(curriculumId, {
    skip: !curriculumId
  })

  const [addLecture] = useAddLectureMutation();
  const [deleteLecture] = useDeleteLectureMutation();
  const [updateLectures] = useUpdateLecturesMutation();

  const [titles, setTitles] = useState<string[]>([]);

  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (lectures) {
      setTitles(lectures.map((lecture) => lecture.title));
    }
  }, [lectures]);

  const onAddLecture = () => {
    if (!curriculumId) {
      alert('커리큘럼을 선택해주세요');
      return;
    }

    if (!user?.userId) {
      alert('로그인을 완료해주세요');
      return;
    }

    addLecture({
      title: '',
      adminId: user?.userId,
      curriculumId
    });
  };

  const onSave = async () => {
    const newLectures: UpdateLectures = [];
    titles.forEach((newTitle, idx) => {
      const { lectureId, title } = lectures?.[idx] || {};
      if (lectureId && newTitle !== title) {
        newLectures.push({ lectureId, title: newTitle });
      }
    });

    if (newLectures.length) {
      await updateLectures(newLectures);
      alert('저장이 완료되었습니다.');
    }
  };

  const onLectureRemove = async (curriculumId: number) => {
    await deleteLecture(curriculumId);
    alert('삭제를 완료했습니다.');
  };

  const onLectureCancle = () => {
    lectures && setTitles(lectures.map((lecture) => lecture.title));
  };


  return (
    <div className="mt-10 overflow-hidden">
      <p className="text-lg font-semibold">교과목</p>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              ID
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              커리큘럼명
            </th>
            <th className="border-gray-300 border-[1px] border-t-black w-5/12 py-3">
              교과목명
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              <button
                className="bg-white border-primary border-[1px] flex items-center justify-center py-[2px] px-3 rounded-sm m-auto"
                onClick={onAddLecture}
              >
                <PlusIcon width={12} />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {lectures
            ? lectures.map((lecture, idx) => (
                <tr key={lecture.lectureId} className="text-center">
                  <td className="border-gray-300 border-[1px] border-t-black py-3">
                    {lecture.lectureId}
                  </td>
                  <td className="border-gray-300 border-[1px] border-t-black py-3">
                    {lecture.curriculum?.title}
                  </td>
                  <td className="border-gray-300 border-[1px] border-t-black py-3">
                    <Input
                      value={titles[idx]}
                      onChange={(e) =>
                        setTitles(
                          titles.map((title, titleIdx) =>
                            idx === titleIdx ? e.target.value : title
                          )
                        )
                      }
                      type="text"
                      className={`mx-5`}
                    />
                  </td>
                  <td className="border-gray-300 border-[1px] border-t-black py-3">
                    <button
                      className="bg-white border-red-500 border-[1px] flex items-center justify-center py-[2px] px-3 rounded-sm m-auto"
                      onClick={
                        () => onLectureRemove(lecture.lectureId)
                      }
                    >
                      <MinusIcon width={12} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      <div className="block float-right mt-6">
        <button
          className="py-2 px-6 rounded-md bg-gray-300 mr-2"
          onClick={onLectureCancle}
        >
          취소
        </button>
        <button
          className="py-2 px-6 rounded-md bg-primary text-white"
          onClick={onSave}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default LectureManagement;
