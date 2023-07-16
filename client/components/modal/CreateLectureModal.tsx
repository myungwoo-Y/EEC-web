'use client';

import { useGetClassesQuery } from '@/services/class';
import { useGetCurriculumsQuery } from '@/services/curriculum';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { useForm } from 'react-hook-form';
import Date from '../Date';
import Input from '../Input';
import Select from '../Select';
import UploadFiles from '../UploadFiles';
import styles from './CreateLectureModal.module.scss';

function CreateLectureModal() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    setValue,
  } = useForm();

  const { data: classes } = useGetClassesQuery();
  const currentClass = classes?.[0];
  // const { data: curriculums } = useGetCurriculumsQuery({
  //   classOrder: parseInt(currentClassOrder),
  //   classId: currentClass?.classId || 0,
  // },
  // { skip: !currentClassOrder || currentClassOrder === '0' || !currentClass });


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center overflow-y-scroll py-8">
      <div className="bg-white w-[800px] rounded-md h-fit">
        <div className="flex justify-between p-4 bg-gray-100 rounded-t-md">
          <p className="text-lg font-bold">강의소개 및 강의자료</p>
          <button className="hover:bg-gray-300 rounded-lg p-1"><XMarkIcon width={24} /></button>
        </div>
        <div className="pt-6 pb-3 px-6">
          <table className="w-full">
            <tbody className="border-t-[1px] border-t-black">
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  교육과정 분류
                </td>
                <td className="px-3">
                  <div className="flex items-center gap-2">
                    <Select className="w-44">
                      <option value="" disabled>
                        기본
                      </option>
                    </Select>
                    {'>'}
                    <Select className="w-44">
                      <option value="" disabled>
                        기본
                      </option>
                    </Select>
                  </div>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  교육과정 명
                </td>
                <td className="px-3">
                  <Input type="text" />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">집필자</td>
                <td className="px-3">
                  <Input className="w-44" type="text" />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강사명</td>
                <td className="px-3">
                  <Input className="w-44" type="text" />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">관리자</td>
                <td className="px-3">
                  <Select className="w-44">
                    <option value="" disabled>
                      양명우
                    </option>
                  </Select>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">일정</td>
                <td className="px-3">
                  <Date
                    firstDateName="startDate"
                    secondDateName="endDate"
                    register={register}
                    className="w-96"
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">소개</td>
                <td className="px-3">
                  <textarea
                    className={`resize-y w-full border-[1px] py-1 px-2 rounded-md focus:border-primary h-28 mt-1 ${
                      errors.description?.type === 'required'
                        ? 'border-red-600'
                        : 'border-gray-200'
                    }`}
                    {...register('description', { required: true })}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full mt-10">
            <tbody className="border-t-[1px] border-t-black">
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강의 자료</td>
                <td className="px-3">
                  <UploadFiles files={[]} setFiles={() => null} />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">참고 자료</td>
                <td className="px-3">
                  <UploadFiles files={[]} setFiles={() => null} />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강의영상</td>
                <td className="px-3">
                  <div className="flex items-center gap-2">
                    <Input type="text" className="w-96" />
                    <button className="flex justify-center items-center gap-1 hover:bg-gray-100 py-1 px-3 rounded-lg">
                      <span>미리보기</span>
                      <EyeIcon width={20} />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full mt-10">
            <tbody className="border-t-[1px] border-t-black">
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  학습평가 일정
                </td>
                <td className="px-3">
                  <Date
                    firstDateName="startDate"
                    secondDateName="endDate"
                    register={register}
                    className="w-96"
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  학습평가 URL
                </td>
                <td className="px-3">
                  <div className="flex items-center gap-2">
                    <Input type="text" className="w-96" />
                    <button className="flex justify-center items-center gap-1 hover:bg-gray-100 py-1 px-3 rounded-lg">
                      <span>미리보기</span>
                      <EyeIcon width={20} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border-[1px]">
                  <div className="flex flex-col items-center justify-center py-2">
                    <p>
                      &#8251; 학습평가 URL의 경우 학습평가 일정기간 중에만
                      수강생에게 공개됩니다.
                    </p>
                    <button className="py-2 px-5 bg-primary rounded-md text-white mt-4 mb-1 w-24">
                      제출확인
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full mt-10">
            <tbody className="border-t-[1px] border-t-black">
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  강사평가 일정
                </td>
                <td className="px-3">
                  <Date
                    firstDateName="startDate"
                    secondDateName="endDate"
                    register={register}
                    className="w-96"
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  강사평가 URL
                </td>
                <td className="px-3">
                  <div className="flex items-center gap-2">
                    <Input type="text" className="w-96" />
                    <button className="flex justify-center items-center gap-1 hover:bg-gray-100 py-1 px-3 rounded-lg">
                      <span>미리보기</span>
                      <EyeIcon width={20} />
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td colSpan={2} className="border-[1px]">
                  <div className="flex flex-col items-center justify-center py-2">
                    <p>
                      &#8251; 강사평가 URL의 경우 강사평가 일정기간 중에만
                      수강생에게 공개됩니다.
                    </p>
                    <button className="py-2 px-5 bg-primary rounded-md text-white mt-4 mb-1 w-24">
                      제출확인
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-center pb-7 gap-2">
          <button className="py-2 px-5 bg-gray-400 rounded-md mt-4 w-24">
            닫기
          </button>
          <button className="py-2 px-5 bg-gray-400 rounded-md mt-4 w-24">
            초기화
          </button>
          <button className="py-2 px-5 bg-primary rounded-md text-white mt-4 w-24">
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLectureModal;
