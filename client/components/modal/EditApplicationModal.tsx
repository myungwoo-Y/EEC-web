import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import checkboxStyles from '../Checkbox.module.scss';
import { useGetApplicationsQuery, useUpdateApplicationActivationMutation } from '@/services/admin';
import { CheckedApplication } from '@/model/application';

type EditApplicationModalProps = {
  classId: number;
  closeModal: () => void;
};

export default function EditApplicationModal({
  classId,
  closeModal,
}: EditApplicationModalProps) {
  const { data } = useGetApplicationsQuery({ classId });
  const [applications, setApplications] = useState<CheckedApplication[]>([]);
  const count = applications?.length ?? 0;
  const activeCount =
    applications?.filter((application) => application.isActive).length ?? 0;
  const [updateApplicationActivation] = useUpdateApplicationActivationMutation();

  useEffect(() => {
    if (data) {
      setApplications(
        data.map((application) => ({
          ...application,
          checked: false,
        }))
      );
    }
  }, [data]);

  const onCheck = (applicationId: number) => {
    setApplications(applications.map((application) => {
      if (application.applicationId === applicationId) {
        return {
          ...application,
          checked: !application.checked
        }
      }
      return application;
    }))
  }
  
  const onSubmit = async ({ isActive }: { isActive: boolean}) => {
    const checkedApplications = applications.filter((application) => application.checked).map(({applicationId}) => ({
      applicationId,
      isActive
    }));
    await updateApplicationActivation(checkedApplications);
    if (isActive) {
      alert(`${checkedApplications.length}건 승인하였습니다.`);
    } else {
      alert(`${checkedApplications.length}건 승인취소 하였습니다.`);
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center overflow-y-scroll py-8">
      <div className="bg-white w-[600px] h-full rounded-md">
        <div className="flex justify-between p-4 bg-gray-100 rounded-t-md">
          <p className="text-lg font-bold">신청리스트</p>
          <button
            className="hover:bg-gray-300 rounded-lg p-1"
            onClick={() => closeModal()}
          >
            <XMarkIcon width={24} />
          </button>
        </div>
        <div className="px-6 overflow-y-auto">
          <table className="w-full mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-gray-300 border-[1px] border-t-black py-3">
                  <input
                    type="checkbox"
                    className={`${checkboxStyles.rectangle} mx-auto`}
                  />
                </th>
                <th className="border-gray-300 border-[1px] border-t-black py-3">
                  순서
                </th>
                <th className="border-gray-300 border-[1px] border-t-black py-3">
                  신청자명
                </th>
                <th className="border-gray-300 border-[1px] border-t-black w-5/12 py-3">
                  상태
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {applications?.map((application, idx) => (
                <tr key={application.applicationId}>
                  <td className="border-gray-300 border-[1px] py-3">
                    <input
                      type="checkbox"
                      className={`${checkboxStyles.rectangle} mx-auto`}
                      onChange={() => onCheck(application.applicationId)}
                      checked={application.checked}
                    />
                  </td>
                  <td className="border-gray-300 border-[1px] py-3">
                    {idx + 1}
                  </td>
                  <td className="border-gray-300 border-[1px] py-3">
                    {application.user?.name}
                  </td>
                  <td className="border-gray-300 border-[1px] py-3">
                    {application.isActive ? (
                      <p className="text-green-500">신청완료</p>
                    ) : (
                      <p className="text-orange-500">승인요청중</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4 font-semibold">
          총 신청완료: {activeCount}/{count}명
        </div>
        <div className="flex items-center justify-center w-full gap-4">
          <button
            className="py-2 px-6 rounded-md bg-green-500 text-white mt-4 w-28"
            onClick={() => onSubmit({ isActive: true })}
          >
            선택승인
          </button>
          <button 
            className="py-2 px-6 rounded-md bg-red-400 text-white mt-4 w-28"
            onClick={() => onSubmit({ isActive: false })}
          >
            승인취소
          </button>
          <button
            className="py-2 px-6 rounded-md bg-gray-500 text-white mt-4 w-28"
            onClick={closeModal}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
