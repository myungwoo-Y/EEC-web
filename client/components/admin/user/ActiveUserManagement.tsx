import SMSModal from '@/components/modal/SMSModal';
import { getUserRoleName } from '@/lib/user';
import { UpdateRegisterStatus, User, UserRole, UserRoles } from '@/model/user';
import {
  useGetUsersByQueryQuery,
  useUpdateUsersMutation,
} from '@/services/user';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import checkboxStyles from '../../Checkbox.module.scss';

function ActiveUserManagement() {
  const { data } = useGetUsersByQueryQuery({ isActive: true });
  const [users, setUsers] = useState<(User & { checked: boolean })[]>([]);
  const [updateUsers] = useUpdateUsersMutation();
  const [showSMSModal, setShowSMSModal] = useState(false);
  const clieckedUsers = users.filter((user) => user.checked);
  const isChecked = clieckedUsers.length > 0;

  useEffect(() => {
    if (data) {
      setUsers(data.map((user) => ({ ...user, checked: false })));
    }
  }, [data]);

  const handleSelect = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.userId !== userId) {
          return user;
        }
        return {
          ...user,
          checked: !user.checked,
        };
      })
    );
  };

  const handleRoleChange = (userId: number, role: UserRole) => {
    setUsers(
      users.map((user) => {
        if (user.userId !== userId) {
          return user;
        }
        return {
          ...user,
          role,
        };
      })
    );
  };

  const onSave = async () => {
    const changedStatus: UpdateRegisterStatus[] = clieckedUsers.map(
      ({ userId, role }) => ({
        userId,
        isActive: true,
        role,
      })
    );

    if (!(changedStatus.length > 0)) {
      alert('회원을 선택해주세요');
      return;
    }

    try {
      await updateUsers(changedStatus).unwrap;
      alert(`${changedStatus.length}건 저장이 완료되었습니다.`);
    } catch (e) {
      alert('승인 요청에 실패했습니다.');
    }
  };

  const onReset = () => {
    setUsers(users.map((user) => ({ ...user, checked: false })));
  };

  const sendMessage = () => {};

  return (
    <div>
      <p className="text-lg font-semibold">회원정보</p>
      <div className="overflow-x-auto">
        <table className="min-w-[1300px] w-full mt-4 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                선택
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                가입신청일
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                아이디
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                이름
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                핸드폰
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                소속
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                직급
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                기수
              </th>
              <th className="border-gray-300 border-[1px] border-t-black py-3">
                권한구분
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.userId}>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      className={`${checkboxStyles.rectangle}`}
                      onChange={() => handleSelect(user.userId)}
                      checked={user.checked}
                    />
                  </div>
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {dayjs(user.createDateTime).format('YYYY-MM-DD HH:MM')}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {user.email}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {user.name}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {user.phoneNumber}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {user.department}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {user.jobLevel}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black py-3">
                  {user.classOrder}
                </td>
                <td className="border-gray-300 border-[1px] border-t-black">
                  <div className="flex items-center justify-center gap-5">
                    {UserRoles.map((role, idx) => (
                      <div
                        className="flex items-center gap-1"
                        key={idx}
                        onClick={() => handleRoleChange(user.userId, role)}
                      >
                        <input
                          type="checkbox"
                          className={`${checkboxStyles.circle}`}
                          checked={user.role === role}
                          onChange={() => null}
                        />
                        <span>{getUserRoleName(role)}</span>
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="float-right">
          <div className="flex gap-2 mt-4">
            <button className="px-3 py-1 text-center border-[1px] border-blue-700 text-blue-500 rounded-md">
              선택된 수강생 카카오톡 알림 발송
            </button>
            <button
              className="px-3 py-1 text-center border-[1px] border-blue-700 text-blue-500 rounded-md"
              onClick={() => {
                if (!isChecked) {
                  return alert('회원을 선택해주세요.');
                }
                setShowSMSModal(true);
              }}
            >
              선택된 수강생 문자 알림 발송
            </button>
          </div>
          <div className="float-right mt-6">
            <button
              className="py-2 px-6 rounded-md bg-gray-300 mr-2"
              onClick={onReset}
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
      </div>
      {showSMSModal && (
        <SMSModal closeModal={() => setShowSMSModal(false)} users={clieckedUsers} />
      )}
    </div>
  );
}

export default ActiveUserManagement;