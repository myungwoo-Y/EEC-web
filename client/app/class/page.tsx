'use client';

import { useGetClassesQuery } from '@/services/class';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { UserRole } from '@/model/user';
import { useAddClassToUserMutation } from '@/services/user';
import EditApplicationModal from '@/components/modal/EditApplicationModal';

export default function Page() {
  const user = useSelector(selectCurrentUser);
  const { data: classes } = useGetClassesQuery();
  const router = useRouter();
  const [addClassToUser] = useAddClassToUserMutation();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(0);
  const isAdmin = user?.role === UserRole.ADMIN;

  const getSubmitButton = (classId: number) => {
    if (user && user.role === UserRole.STUDENT) {
      const application = user.applications.find((data) => data.class?.classId === classId);
      if (application) {
        if (application.isActive) {
          return (
            <button
              className="bg-green-500 rounded-md text-white px-2 h-9"
            >
              신청완료
            </button>
          );
        } else {
          return (
            <div
              className="bg-gray-400 rounded-md text-white px-2 h-9 flex items-center"
            >
              승인요청중
            </div>
          );
        }
      }
      return (
        <button
          className="bg-blue-500 rounded-md text-white px-2 h-9"
          onClick={() => onSubmit(classId)}
        >
          신청하기
        </button>
      );
    }

    if (user?.role === UserRole.ADMIN) {
      return (
        <button
          className="bg-yellow-400 rounded-md text-white px-2 h-9"
          onClick={() => {
            setSelectedClassId(classId);
            setIsShowEditModal(!isShowEditModal);
          }}
        >
          신청확인
        </button>
      );
    }

    return null;
  };

  const onSubmit = async (classId: number) => {
    if (!user) {
      return;
    }

    if (user.role === UserRole.STUDENT) {
      await addClassToUser({ classId, userId: user.userId});
      alert('수강 신청을 요청 했습니다. 관리자의 승인을 기다려주세요.');
    }

    if (user.role === UserRole.ADMIN) {
      // open user modal
    }
  };

  return (
    <div className="pt-10 px-12">
      <div className="font-bold text-2xl">강의일정</div>
      <div className="w-full flex flex-col gap-6 mt-16">
        {classes &&
          classes.map((data) => (
            <div
              className="w-full flex justify-between border-b-2 border-gray-100 pb-4"
              key={data.classId}
            >
              <div className="flex">
                <div className="bg-gray-300 rounded-md w-64"></div>
                <div className="flex flex-col gap-1 ml-5 w-80">
                  <p className="text-lg font-bold">{data.title}</p>
                  <div className="flex flex-col">
                    <div>
                      <div className="flex items-center">
                        <CalendarDaysIcon width={16} className="mr-1" />{' '}
                        신청기간:
                      </div>
                      <p className="text-gray-400">
                        {dayjs(data.registerStart).format('YYYY.MM.DD')}~
                        {dayjs(data.registerEnd).format('YYYY.MM.DD')}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <BookOpenIcon width={16} className="mr-1" /> 구성 과목
                    </div>
                    <p className="text-gray-400">{data.description}</p>
                  </div>
                </div>
              </div>
              <div>
                {getSubmitButton(data.classId)}
                {isAdmin && (
                  <button
                    className="bg-gray-400 ml-2 rounded-md text-white px-2 h-9"
                    onClick={() => router.push(`/class/${data.classId}/update`)}
                  >
                    수정하기
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
      {isAdmin && (
        <button
          className="bg-gray-400 rounded-md text-white px-3 py-2 float-right mt-14"
          onClick={() => router.push('/class/create')}
        >
          강의 추가하기
        </button>
      )}
      {isShowEditModal && (
        <EditApplicationModal
          closeModal={() => setIsShowEditModal(false)}
          classId={selectedClassId}
        />
      )}
    </div>
  );
}
