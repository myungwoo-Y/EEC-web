import Date from '@/components/Date';
import Input from '@/components/Input';
import UserSelector from '@/components/UserSelector';
import { CertificationUser, User } from '@/model/user';
import { useGetUsersByQueryQuery } from '@/services/user';
import React, { useEffect, useState } from 'react';
import checkboxStyles from '../../Checkbox.module.scss';
import { useForm } from 'react-hook-form';
import InputWithIcon from '@/components/InputIcon';
import { TagIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid';
import CertificationTable from './CertificationTable';
import { Certification, CertificationType } from '@/model/certification';

function Certification() {
  const { data } = useGetUsersByQueryQuery({ isActive: true });
  const [users, setUsers] = useState<CertificationUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<CertificationUser[]>([]);
  const [certificationType, setCertificationType] = useState<CertificationType>(CertificationType.Normal);

  const { register, getValues } = useForm<Certification>();

  const onCertificationTypeChange = () => {
    if (certificationType === CertificationType.Normal) {
      return setCertificationType(CertificationType.Course);
    }
    setCertificationType(CertificationType.Normal);
  }

  const onFillAll = () => {
    const certificationInfo = getValues();
    setUsers(users.map((user) => ({
      ...user,
      ...certificationInfo
    })))
  }

  useEffect(() => {
    if (data) {
      setUsers(
        data.map((user) => ({
          ...user,
          checked: false,
          issueNumber: '',
          startDate: '',
          endDate: '',
          title: '',
          certificationDate: '',
          type: certificationType
        }))
      );
    }
  }, [data, certificationType]);

  return (
    <div className="pb-8">
      <div className="grid lg:grid-cols-2 border-t-2 border-b-2 border-gray-100 py-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-1">
            <input
              id="certification"
              type="checkbox"
              className={`${checkboxStyles.circle}`}
              checked={certificationType === CertificationType.Normal}
              onChange={onCertificationTypeChange}
            />
            <label htmlFor="certification" className="text-xl font-semibold">
              수료증
            </label>
          </div>
          <div className="flex items-center gap-1">
            <input
              id="courseCertification"
              type="checkbox"
              className={`${checkboxStyles.circle}`}
              checked={certificationType === CertificationType.Course}
              onChange={onCertificationTypeChange}
            />
            <label
              htmlFor="courseCertification"
              className="text-xl font-semibold"
            >
              이수증
            </label>
          </div>
        </div>
        <UserSelector users={users} setFilteredUsers={setFilteredUsers} />
      </div>
      <div className="flex justify-between py-4 border-b-2 border-gray-100">
        <div className="flex gap-4">
          <InputWithIcon
            type="number"
            className="w-32 h-8"
            register={register}
            name="issueNumber"
            placeholder="발급번호"
            Icon={TagIcon}
          />
          <InputWithIcon
            type="text"
            className="w-32 h-8"
            register={register}
            name="title"
            placeholder="교육제목"
            Icon={ChatBubbleBottomCenterIcon}
          />
          <div className="flex items-center gap-1">
            <span>교육기간</span>
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
          <div className="flex items-center gap-1">
            <span>발급일</span>
            <span>:</span>
            <input
              type="date"
              className="w-[130px] h-8 box-border border-gray-400 border-[1px] p-[6px] outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              {...register('certificationDate')}
            />
          </div>
        </div>
        <button className="px-6 rounded-md bg-gray-200" onClick={onFillAll}>일괄입력</button>
      </div>
      <CertificationTable 
        users={users} 
        setUsers={setUsers}
        filteredUsers={filteredUsers}
        certificationType={certificationType}
      />
    </div>
  );
}

export default Certification;
