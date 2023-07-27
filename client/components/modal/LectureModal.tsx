'use client';

import { toKoreaDate } from '@/lib/date';
import { Lecture } from '@/model/lecture';
import { useGetUsersQuery } from '@/services/user';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Download from '../Download';

type LectureModalProps = {
  lecture: Lecture;
  closeModal: () => void;
};

function LectureModal({ lecture, closeModal }: LectureModalProps) {
  const { data: admins } = useGetUsersQuery();

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
                    <p>{lecture.curriculum?.class?.title}</p> 
                    {'>'} 
                    <p>{lecture.curriculum?.title}</p>
                  </div>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  교육과정 명
                </td>
                <td className="px-3">
                  <p>{lecture.title}</p>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">집필자</td>
                <td className="px-3">
                  <p>{lecture.author}</p>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강사명</td>
                <td className="px-3">
                  <p>{lecture.lecturer}</p>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">관리자</td>
                <td className="px-3">
                  <p>{lecture.admin.name}</p>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">일정</td>
                <td className="px-3">
                  <div className="flex items-center gap-2">
                    <p>{toKoreaDate(lecture.startDate)}</p>
                    {"~"}
                    <p>{toKoreaDate(lecture.endDate)}</p>
                  </div>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">소개</td>
                <td className="px-3">
                  <p>{lecture.intro}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full mt-10">
            <tbody className="border-t-[1px] border-t-black">
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강의 자료</td>
                <td className="px-3">
                  {lecture.lectureFiles.map((lectureFile) => (
                    <Download 
                      fileName={lectureFile.filename}
                      path={lectureFile.path}
                      key={lectureFile.fileId}
                    />
                  ))}
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">참고 자료</td>
                <td className="px-3">
                  {lecture.referenceFiles.map((referenceFile) => (
                    <Download 
                      fileName={referenceFile.filename}
                      path={referenceFile.path}
                      key={referenceFile.fileId}
                    />
                  ))}
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">강의영상</td>
                <td className="px-3">
                  <a href={lecture.lectureLink} target="_blank" className="text-blue-600 underline">{lecture.lectureLink}</a>
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
                  <div className="flex items-center gap-2">
                    <p>{toKoreaDate(lecture.evaluateStartDate)}</p>
                    {"~"}
                    <p>{toKoreaDate(lecture.evaluateEndDate)}</p>
                  </div>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  학습평가 URL
                </td>
                <td className="px-3">
                  <a href={lecture.evaluateLink} target="_blank" className="text-blue-600 underline">{lecture.evaluateLink}</a>
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
                  <div className="flex items-center gap-2">
                    <p>{toKoreaDate(lecture.lecturerEvaluateStartDate)}</p>
                    {"~"}
                    <p>{toKoreaDate(lecture.lecturerEvaluateEndDate)}</p>
                  </div>
                </td>
              </tr>
              <tr className="border-[1px] border-t-0">
                <td className="bg-gray-100 w-36 py-4 text-center">
                  강사평가 URL
                </td>
                <td className="px-3">
                  <a href={lecture.lecturerEvaluateLink} target="_blank" className="text-blue-600 underline">{lecture.lecturerEvaluateLink}</a>
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
        </div>
      </div>
    </div>
  );
}

export default LectureModal;
