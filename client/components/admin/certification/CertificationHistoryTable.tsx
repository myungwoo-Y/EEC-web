import ClassOrderOption from '@/components/ClassOrderOption';
import Date from '@/components/Date';
import InputWithIcon from '@/components/InputIcon';
import Select from '@/components/Select';
import { toInputDate } from '@/lib/date';
import { getCertificationName } from '@/lib/user';
import { CertificationHistory, CertificationType } from '@/model/certification';
import { useGetCertificationAllQuery, useRemoveCertificationMutation } from '@/services/admin';
import { UserIcon } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function ResultTable() {
  const { data: certifications } = useGetCertificationAllQuery();
  const [filteredCertifications, setFilteredCertifications] = useState<CertificationHistory[]>([]);
  const [deleteCertification] = useRemoveCertificationMutation();
  const { register, getValues, watch } = useForm();
  const filterValues = watch();


  useEffect(() => {
    if (certifications) {
      setFilteredCertifications(certifications);
    }
  }, [certifications]);

  useEffect(() => {
    if (!certifications) {
      return;
    }
    setFilteredCertifications(certifications.filter((certification) => {
      const {classOrder, type, startDate, endDate, name} = filterValues;
      const certificationDate = dayjs(certification.certificationDate);
      if (classOrder && classOrder != certification.classOrder) {
        return false;
      }

      if (type && type !== certification.type) {
        return false;
      }

      if (startDate && dayjs(startDate).isAfter(certificationDate, 'day')) {
        return false;
      }

      if (endDate && dayjs(endDate).isBefore(certificationDate, 'day')) {
        return false;
      }

      if (name && !certification.name.includes(name)) {
        return false;
      }

      return true;
    }));
  }, [filterValues.classOrder, filterValues.type, filterValues.startDate, filterValues.endDate, filterValues.name])

  const onDeleteCertification = async (certification: CertificationHistory) => {
    if (confirm('삭제하시겠습니까?')) {
      const { certificationId, userId } = certification;
      await deleteCertification({
        certificationId,
        userId,
      });
      alert('삭제가 완료되었습니다.')
    }
  }

  return (
    <div>
      <div className="flex justify-between py-4 border-b-2 border-gray-100">
        <div className="flex gap-4">
          <div className="flex items-center gap-1">
            <span>기수</span>
            <span>:</span>
            <Select register={register} name="classOrder" className="w-24" watch={watch}>
              <option value="">전체</option>
              <ClassOrderOption />
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <span>증명서</span>
            <span>:</span>
            <Select register={register} name="type" className="w-24" watch={watch}>
              <option value="">전체</option>
              <option value={CertificationType.Normal}>수료증</option>
              <option value={CertificationType.Course}>이수증</option>
            </Select>
          </div>
          <div className="flex items-center gap-1">
            <span>발급기간</span>
            <span>:</span>
            <Date
              register={register}
              firstDateName="startDate"
              secondDateName="endDate"
              className="h-full"
              inputClassName="h-8 w-[130px] bg-white"
              gap={1}
            />
          </div>
          <InputWithIcon 
            type="text"
            register={register}
            Icon={UserIcon}
            name="name"
            className="w-36"
            placeholder="이름"
          />
        </div>
      </div>
      <table className="min-w-[1300px] w-full mt-4 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              기수
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              구분
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              소속
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              직급
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              이름
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              발급번호
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              교육기간
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              교육제목
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              발급일
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              관리
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCertifications?.map((certification, idx) => (
            <tr
              key={`${certification.certificationId}_${certification.userId}`}
            >
              <td className="border-gray-300 border-[1px] py-3 w-12">
                {certification.classOrder}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-24">
                {getCertificationName(certification.type)}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                {certification.department}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                {certification.jobLevel}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                {certification.name}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                {certification.issueNumber}
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-56">
                {toInputDate(certification.startDate)}
                <span className="mx-1">~</span>
                {toInputDate(certification.endDate)}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                {certification.title}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                {toInputDate(certification.certificationDate)}
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                <button 
                  className="mx-auto px-3 py-1 text-center bg-red-500 text-white rounded-md"
                  onClick={() => onDeleteCertification(certification)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
