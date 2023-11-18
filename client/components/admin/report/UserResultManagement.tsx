import Button from '@/components/Button';
import Filter from '@/components/Filter/indx';
import {
  useGetUserResultsQuery,
  useUpdateUsersMutation,
} from '@/services/user';
import { FlagIcon, UserIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useRef, useState } from 'react';
import UserResultTable from './UserResultTable';
import { User } from '@/model/user';
import useAlertSave from '@/hooks/useAlertSave';
import {utils, writeFile} from 'xlsx';
import { getSimpleNow } from '@/lib/date';

function UserResultManagement() {
  const tableRef = useRef<HTMLTableElement>(null);
  const { data: users } = useGetUserResultsQuery();
  const [filteredUsers, setFilteredUsers] = useState<User[] | undefined>(
    undefined
  );

  const [updateUsers, { isSuccess, isError }] = useUpdateUsersMutation();
  const onDownloadExcel = () => {
    const table = tableRef.current;
    const wb = utils.table_to_book(table, { sheet: 'Sheet JS' });
    writeFile(wb, `역학조사관현황_${getSimpleNow()}.xlsx`);
  }

  const filterName = (name: string) =>
    setFilteredUsers(
      users?.filter((user) => !name || user.name.includes(name))
    );
  const filterClassOrder = (classOrder: string) =>
    setFilteredUsers(
      users?.filter(
        (user) => !classOrder || user.classOrder === parseInt(classOrder)
      )
    );
  const onSave = () => {
    const memoChangedUsers: { userId: number; memo: string }[] =
      filteredUsers
        ?.filter((user) => user.memo)
        .map((user) => ({ userId: user.userId, memo: user.memo })) || [];

    if (memoChangedUsers.length) {
      updateUsers(memoChangedUsers);
    }
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useAlertSave({ isSuccess, isError });

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
            className="h-10"
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
          <Button variant="solid" color="gray" onClick={() => null}>
            취소
          </Button>
          <Button variant="solid" onClick={onSave}>
            저장
          </Button>
          <Button variant="solid" onClick={onDownloadExcel}>
            엑셀다운로드
          </Button>
        </div>
      </div>
      <UserResultTable
        users={filteredUsers}
        setUsers={setFilteredUsers}
        ref={tableRef}
      />
    </div>
  );
}

export default UserResultManagement;
