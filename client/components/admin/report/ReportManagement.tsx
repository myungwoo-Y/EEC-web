import Filter from '@/components/Filter/indx'
import { useGetUserResultsQuery } from '@/services/user'
import { FlagIcon } from '@heroicons/react/24/solid'
import React from 'react'

function UserResultManagement() {
  const [users] = useGetUserResultsQuery();
  return (
    <div>
      <div className="text-lg font-semibold">역학조사관 교육 및 훈련 수료 현황</div>
      <div>
      {/* <Filter
          Icon={FlagIcon}

        />
        {users.map((user) => (

        ))} */}
      </div>
    </div>
  )
}

export default UserResultManagement