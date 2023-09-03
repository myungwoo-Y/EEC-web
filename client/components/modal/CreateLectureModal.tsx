'use client';

import { toISOString, toInputDate } from '@/lib/date';
import { getFileFromUrl } from '@/lib/downloadFile';
import { openNewTap } from '@/lib/url';
import { Lecture, UpdateLecture } from '@/model/lecture';
import { useGetClassesQuery } from '@/services/class';
import { useGetCurriculumsQuery } from '@/services/curriculum';
import { useUpdateLectureMutation } from '@/services/lecture';
import { useGetUsersQuery } from '@/services/user';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import Date from '../Date';
import Input from '../Input';
import Select from '../Select';
import UploadFiles from '../UploadFiles';
import { isString } from '@/lib/string';
import { File, FileMeta } from '@/model/file';

type LectureModalProps = {
  lecture: Lecture;
  closeModal: () => void;
};

function CreateLectureModal({ lecture, closeModal }: LectureModalProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    getValues
  } = useForm();
  const [lectureFiles, setLectureFiles] = useState<File[]>([]);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const { data: classes } = useGetClassesQuery();
  const [currentClassId, setCurrentClassId] = useState(
    lecture.curriculum?.class?.classId || ''
  );
  const { data: curriculums } = useGetCurriculumsQuery(
    {
      classId: currentClassId,
    },
    { skip: !currentClassId }
  );
  const { data: admins } = useGetUsersQuery();
  const [updateLecture, { isSuccess }] = useUpdateLectureMutation();

  if (isSuccess) {
    alert('저장이 완료되었습니다.');
    closeModal();
  }

  useEffect(() => {
    const {
      startDate,
      endDate,
      evaluateStartDate,
      evaluateEndDate,
      lecturerEvaluateStartDate,
      lecturerEvaluateEndDate,
      lectureFiles,
      referenceFiles,
    } = lecture;
    reset({
      ...lecture,
      curriculumId: lecture.curriculum?.curriculumId,
      admin: lecture.admin.userId,
      startDate: toInputDate(startDate),
      endDate: toInputDate(endDate),
      evaluateStartDate: toInputDate(evaluateStartDate),
      evaluateEndDate: toInputDate(evaluateEndDate),
      lecturerEvaluateStartDate: toInputDate(lecturerEvaluateStartDate),
      lecturerEvaluateEndDate: toInputDate(lecturerEvaluateEndDate),
    });
    setLectureFiles(lectureFiles);
    setReferenceFiles(referenceFiles);
    // lectureFiles.map(async (lectureFile) => {
    //   const newFile = await getFileFromUrl(
    //     lectureFile.path,
    //     lectureFile.filename
    //   );
    //   setLectureFiles((files) => [...files, newFile]);
    // });
    // referenceFiles.map(async (referenceFile) => {
    //   const newFile = await getFileFromUrl(
    //     referenceFile.path,
    //     referenceFile.filename
    //   );
    //   setReferenceFiles((files) => [...files, newFile]);
    // });
  }, [reset, lecture]);

  const onSave = async (data: Record<string, any>) => {
    const formData = new FormData();
    lectureFiles.map((file) => {
      formData.append('lectureFiles', JSON.stringify(file));
    });
    referenceFiles.map((file) => {
      formData.append('referenceFiles', JSON.stringify(file));
    });

    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('lecturer', data.lecturer);
    formData.append('curriculumId', lecture.curriculum?.curriculumId + '');
    formData.append('adminId', data.admin);
    formData.append('startDate', toISOString(data.startDate));
    formData.append('endDate', toISOString(data.endDate));
    formData.append('intro', data.intro);
    formData.append('lectureLink', data.lectureLink);
    isString(data.evaluateStartDate) &&
      formData.append(
        'evaluateStartDate',
        toISOString(data.evaluateStartDate)
      );
    isString(data.evaluateEndDate) &&
      formData.append(
        'evaluateEndDate',
        toISOString(data.evaluateEndDate)
      );
    formData.append('evaluateLink', data.evaluateLink);
    isString(data.lecturerEvaluateStartDate) &&
      formData.append(
        'lecturerEvaluateStartDate',
        toISOString(data.lecturerEvaluateStartDate)
      );
    isString(data.lecturerEvaluateEndDate) &&
      formData.append(
        'lecturerEvaluateEndDate',
        toISOString(data.lecturerEvaluateEndDate)
      );
    formData.append('lecturerEvaluateLink', data.lecturerEvaluateLink);

    await updateLecture({
      lectureId: lecture.lectureId,
      formData,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center overflow-y-scroll py-8">
      <div className="bg-white w-[800px] rounded-md h-fit">
        <div className="flex justify-between p-4 bg-gray-100 rounded-t-md">
          <p className="text-lg font-bold">강의소개 및 강의자료</p>
          <button
            className="hover:bg-gray-300 rounded-lg p-1"
            onClick={() => closeModal()}
          >
            <XMarkIcon width={24} />
          </button>
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
                    <Select
                      className="w-44"
                      onChange={(e) => setCurrentClassId(e.target.value)}
                    >
                      <option value={lecture.curriculum?.class?.classId}>
                        {lecture.curriculum?.class?.title}
                      </option>
                      {classes?.map((classData) => {
                        if (
                          lecture.curriculum?.class?.classId !==
                          classData.classId
                        ) {
                          return (
                            <option
                              key={classData.classId}
                              value={classData.classId}
                            >
                              {classData.title}
                            </option>
                          );
                        }
                        return null;
                      })}
                    </Select>
                    {'>'}
                    <Select
                      className="w-44"
                      register={register}
                      name="curriculumId"
                      watch={watch}
                    >
                      {curriculums &&
                        curriculums.map((curriculum) => (
                          <option
                            key={curriculum.curriculumId}
                            value={curriculum.curriculumId}
                          >
                            {curriculum.title}
                          </option>
                        ))}
                    </Select>
                  </div>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  교육과정 명
                </td>
                <td className="px-3">
                  <Input type="text" register={register} name="title" />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">집필자</td>
                <td className="px-3">
                  <Input
                    className="w-44"
                    type="text"
                    register={register}
                    name="author"
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강사명</td>
                <td className="px-3">
                  <Input
                    className="w-44"
                    type="text"
                    register={register}
                    name="lecturer"
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">관리자</td>
                <td className="px-3">
                  <Select className="w-44" register={register} name="admin">
                    {admins &&
                      admins.map((admin) => (
                        <option value={admin.userId} key={admin.userId}>
                          {admin.name}
                        </option>
                      ))}
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
                    option={{ required: true }}
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">소개</td>
                <td className="px-3">
                  <textarea
                    className={`resize-y w-full border-[1px] py-1 px-2 rounded-md focus:border-primary h-28 mt-1 ${
                      errors.intro?.type === 'required'
                        ? 'border-red-600'
                        : 'border-gray-200'
                    }`}
                    {...register('intro', { required: true })}
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
                  <UploadFiles
                    files={lectureFiles}
                    setFiles={setLectureFiles}
                    name="lecture"
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">참고 자료</td>
                <td className="px-3">
                  <UploadFiles
                    files={referenceFiles}
                    setFiles={setReferenceFiles}
                  />
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강의영상</td>
                <td className="px-3">
                  <div className="flex items-center gap-2">
                  <Input
                    className="w-96"
                    type="text"
                    register={register}
                    name="lectureLink"
                  />
                    <button className="flex justify-center items-center gap-1 hover:bg-gray-100 py-1 px-3 rounded-lg" onClick={() => openNewTap(getValues('lectureLink'))} >
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
                    firstDateName="evaluateStartDate"
                    secondDateName="evaluateEndDate"
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
                  <Input
                    className="w-96"
                    type="text"
                    register={register}
                    name="evaluateLink"
                  />
                    <button className="flex justify-center items-center gap-1 hover:bg-gray-100 py-1 px-3 rounded-lg" onClick={() => openNewTap(getValues('evaluateLink'))} >
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
                    firstDateName="lecturerEvaluateStartDate"
                    secondDateName="lecturerEvaluateEndDate"
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
                  <Input
                    className="w-96"
                    type="text"
                    register={register}
                    name="lecturerEvaluateLink"
                  />
                    <button className="flex justify-center items-center gap-1 hover:bg-gray-100 py-1 px-3 rounded-lg" onClick={() => openNewTap(getValues('lecturerEvaluateLink'))}>
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
          <button 
            className="py-2 px-5 bg-gray-300 rounded-md mt-4 w-24"
            onClick={closeModal}
          >
            닫기
          </button>
          <button className="py-2 px-5 bg-gray-300 rounded-md mt-4 w-24">
            초기화
          </button>
          <button
            className="py-2 px-5 bg-primary rounded-md text-white mt-4 w-24"
            onClick={handleSubmit(onSave)}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateLectureModal;
