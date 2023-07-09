import { useGetClassesQuery } from '@/services/class';
import { PlusIcon } from '@heroicons/react/24/solid';
import React from 'react';
import checkboxStyles from '../Checkbox.module.scss';
import Input from '../Input';

function ClassManagement() {
  const { data: classes } = useGetClassesQuery();

  return (
    <div>
      <div>
        <p className="text-lg font-semibold">교육과정</p>
        <div className="flex gap-6 mt-4">
          {classes &&
            classes.map((classData) => (
              <div className="flex items-center" key={classData.classId}>
                <input
                  type="checkbox"
                  id={classData.classId + ''}
                  className={`${checkboxStyles.circle} mr-1`}
                />
                <label htmlFor={classData.classId + ''}>{classData.title}</label>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-lg font-semibold">기수 및 년도 구분</p>
        <div className="flex gap-6 mt-4">
          <div className="flex items-center">
            <Input 
              type="number"
              className="w-14 mr-1"
            /> 
            <p>기</p>
          </div>
          <button className="bg-primary text-white py-1 px-3 rounded-md">조회하기</button>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-lg font-semibold">커리큘럼</p>
        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-gray-300 border-[1px] border-t-black py-2">ID</th>
              <th className="border-gray-300 border-[1px] border-t-black py-2">교육과정</th>
              <th className="border-gray-300 border-[1px] border-t-black py-2">구분</th>
              <th className="border-gray-300 border-[1px] border-t-black py-2 w-7/12">커리큘럼</th>
              <th className="border-gray-300 border-[1px] border-t-black py-2">
                <button className="bg-white border-primary border-[1px] flex items-center justify-center py-[2px] px-3 rounded-sm m-auto">
                  <PlusIcon width={12} />
                </button>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

export default ClassManagement;
