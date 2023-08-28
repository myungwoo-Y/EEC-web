import { UpdateCurriculums } from '@/model/curriculum';
import { useGetClassesQuery } from '@/services/class';
import {
  useAddCurriculumMutation,
  useDeleteCurriculumMutation,
  useGetCurriculumsQuery,
  useUpdateCurriculumsMutation,
} from '@/services/curriculum';
import { MinusIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import checkboxStyles from '../Checkbox.module.scss';
import Input from '../Input';
import LectureManagement from './LectureManagement';

function ClassManagement() {
  const { data: classes } = useGetClassesQuery();
  const [classIdx, setClassIdx] = useState(0);
  const [classOrder, setClassOrder] = useState('');
  const [addCurriculum, { isSuccess }] = useAddCurriculumMutation();
  const [curriculumTitle, setCurriculumTitle] = useState('');
  const [selectedCurriculumId, setSelectedCurriculumId] = useState(0);
  const [titles, setTitles] = useState<string[]>([]);
  const { data: curriculums } = useGetCurriculumsQuery(
    {
      classOrder: parseInt(classOrder || '0'),
      classId: classes?.[classIdx]?.classId || 0,
    },
    { skip: !classOrder || !classes }
  );
  const [updateCurriculums] = useUpdateCurriculumsMutation();
  const [deleteCurriculum] = useDeleteCurriculumMutation();

  useEffect(() => {
    if (curriculums) {
      setTitles(curriculums.map((curriculum) => curriculum.title));
    }
  }, [curriculums]);

  const onAddCurriculum = () => {
    if (!classOrder) {
      alert('기수를 입력해주세요');
      return;
    }

    if (!classes?.length) {
      alert('과정을 추가해주세요');
      return;
    }

    addCurriculum({
      title: '',
      classOrder: parseInt(classOrder),
      classId: classes[classIdx].classId,
    });
  };

  const onSave = async () => {
    const newCurriculums: UpdateCurriculums = [];
    titles.forEach((newTitle, idx) => {
      const { curriculumId, title } = curriculums?.[idx] || {};
      if (curriculumId && newTitle !== title) {
        newCurriculums.push({ curriculumId, title: newTitle });
      }
    });

    if (newCurriculums.length) {
      await updateCurriculums(newCurriculums);
      alert('저장이 완료되었습니다.');
    }
  };

  const onCurriculumRemove = async (curriculumId: number) => {
    await deleteCurriculum(curriculumId);
    alert('삭제를 완료했습니다.');
  };

  const onCurriculumCancle = () => {
    curriculums && setTitles(curriculums.map((curriculum) => curriculum.title));
  };

  return (
    <div className="pb-8">
      <div>
        <p className="text-lg font-semibold">교육과정</p>
        <div className="flex gap-6 mt-4">
          {classes &&
            classes.map((classData, idx) => (
              <div className="flex items-center" key={classData.classId}>
                <input
                  type="checkbox"
                  id={classData.classId + ''}
                  className={`${checkboxStyles.circle} mr-1`}
                  checked={idx === classIdx}
                  onChange={() => setClassIdx(idx)}
                />
                <label htmlFor={classData.classId + ''}>
                  {classData.title}
                </label>
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
              value={classOrder}
              onChange={(e) => setClassOrder(e.target.value)}
            />
            <p>기</p>
          </div>
        </div>
      </div>
      <div className="mt-10 overflow-hidden">
        <p className="text-lg font-semibold">커리큘럼</p>
        <table className="w-full mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                ID
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                교육과정
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                구분
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3 w-1/2">
                커리큘럼
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                <button
                  className="bg-white border-primary border-[1px] flex items-center justify-center py-[2px] px-3 rounded-sm m-auto"
                  onClick={onAddCurriculum}
                >
                  <PlusIcon width={12} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {classOrder && curriculums && titles.length
              ? curriculums.map((curriculum, idx) => (
                  <tr 
                    key={curriculum.curriculumId} 
                    className="text-center hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedCurriculumId(curriculum.curriculumId)}
                  >
                    <td className="border-gray-300 border-[1px] border-t-black py-3">
                      {idx+1}
                    </td>
                    <td className="border-gray-300 border-[1px] border-t-black py-3">
                      {curriculum.class?.title}
                    </td>
                    <td className="border-gray-300 border-[1px] border-t-black py-3">
                      {curriculum.classOrder}기
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
                        onClick={e => e.stopPropagation()}
                        type="text"
                        className={`mx-5 hover:bg-white`}
                      />
                    </td>
                    <td className="border-gray-300 border-[1px] border-t-black py-3">
                      <button
                        className="bg-white border-red-500 border-[1px] flex items-center justify-center py-[2px] px-3 rounded-sm m-auto"
                        onClick={() =>
                          onCurriculumRemove(curriculum.curriculumId)
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
        <div className="float-right mt-6">
          <button
            className="py-2 px-6 rounded-md bg-gray-300 mr-2"
            onClick={onCurriculumCancle}
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
      <LectureManagement curriculumId={selectedCurriculumId} />
    </div>
  );
}

export default ClassManagement;
