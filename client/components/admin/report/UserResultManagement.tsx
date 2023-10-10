import Button from '@/components/Button';
import Filter from '@/components/Filter/indx';
import { useGetUserResultsQuery } from '@/services/user';
import { FlagIcon, UserIcon } from '@heroicons/react/24/solid';
import React from 'react';
import UserResultTable from './UserResultTable';

function UserResultManagement() {
  const { data: users } = useGetUserResultsQuery();
  const filterName = (name: string) => null;
  const filterClassOrder = (classOrder: string) => null;

  return (
    <div>
      <div className="text-lg font-semibold">
        역학조사관 교육 및 훈련 수료 현황
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 mt-3">
          <Filter
            Icon={FlagIcon}
            setData={filterClassOrder}
            name="filterClassOrder"
            placeholder="기수"
            type="number"
            className='h-10'
          />
          <Filter
            Icon={UserIcon}
            setData={filterName}
            name="filterName"
            placeholder="이름"
            className="w-32 h-10"
          />
        </div>

        <div className="flex gap-2 h-10">
          <Button variant='solid' color='gray' onClick={() => null}>취소</Button>
          <Button variant='solid' onClick={() => null}>저장</Button>
          <Button variant='solid' onClick={() => null}>엑셀다운로드</Button>
        </div>
      </div>
      <UserResultTable users={users} />
    </div>
  );
}

export default UserResultManagement;
