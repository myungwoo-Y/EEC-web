import Input from '@/components/Input';
import { downloadFile } from '@/lib/downloadFile';
import { Certification, CertificationType } from '@/model/certification';
import { CertificationUser } from '@/model/user';
import { useCreateCertificationsMutation } from '@/services/admin';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import checkboxStyles from '../../Checkbox.module.scss';

type CertificationTableProps = {
  users: CertificationUser[];
  setUsers: (user: CertificationUser[]) => void;
  filteredUsers: CertificationUser[];
  certificationType?: CertificationType;
};

function CertificationTable({
  users,
  filteredUsers,
  setUsers,
  certificationType = CertificationType.Normal 
}: CertificationTableProps) {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [createCertifications] = useCreateCertificationsMutation();
  const isNormalType = certificationType === CertificationType.Normal;

  const onChangeUserCertification = (
    userId: number,
    option: Partial<Certification & { checked: boolean }>
  ) => {
    setUsers(
      users.map((user) => {
        if (userId !== user.userId) {
          return user;
        }
        return {
          ...user,
          ...option,
        };
      })
    );
  };

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

  const onCheckAll = () => {
    setUsers(users.map((user) => ({
      ...user,
      checked: !isCheckAll
    })));
    setIsCheckAll(!isCheckAll);
  }

  const onSubmit = async () => {
    const now = Date.now();
    const checkedUsers = users.filter((user) => user.checked).map((user) => ({
      ...user,
      startDate: dayjs(user.startDate || now).toISOString(),
      endDate: dayjs(user.endDate || now).toISOString(),
      certificationDate: dayjs(user.certificationDate || now).toISOString()
    }));

    const res = await createCertifications({
      certificationType,
      users: checkedUsers
    }).unwrap();
    const unit8 = new Uint8Array(res.data);
    const blob = new Blob([unit8]);
    const fileName = isNormalType ? '수료증.zip' : '이수증.zip';
    downloadFile(blob, fileName);
  }

  return (
    <div>
      <table className="min-w-[1300px] w-full mt-4 text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              <input
                type="checkbox"
                className={`${checkboxStyles.rectangle} mx-auto`}
                checked={isCheckAll}
                onChange={onCheckAll}
              />
            </th>
            <th className="border-gray-300 border-[1px] border-t-black py-3">
              순서
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
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr key={user.userId}>
              <td className="border-gray-300 border-[1px] py-3">
                <input
                  type="checkbox"
                  className={`${checkboxStyles.rectangle} mx-auto`}
                  onChange={() => handleSelect(user.userId)}
                  checked={user.checked}
                />
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                <p className="text-center">{idx+1}</p>
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                <p className="text-center">{user.department}</p>
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                <p className="text-center">{user.jobLevel}</p>
              </td>
              <td className="border-gray-300 border-[1px] py-3">
                <p className="text-center">{user.name}</p>
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-24">
                <Input
                  type="number"
                  className="w-20 mx-auto"
                  placeholder="번호"
                  value={user.issueNumber}
                  onChange={(e) =>
                    onChangeUserCertification(user.userId, {
                      issueNumber: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-[340px]">
                <div className="flex gap-2 px-2">
                  <input
                    type="date"
                    className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
                    value={user.startDate}
                    onChange={(e) =>
                      onChangeUserCertification(user.userId, {
                        startDate: e.target.value,
                      })
                    }
                  />
                  <span className="text-gray-400">~</span>
                  <input
                    type="date"
                    value={user.endDate}
                    className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
                    onChange={(e) =>
                      onChangeUserCertification(user.userId, {
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-56">
                <Input
                  type="text"
                  placeholder="제목"
                  className="w-52 mx-auto"
                  value={
                    certificationType === CertificationType.Normal
                      ? ''
                      : user.title
                  }
                  disabled={certificationType === CertificationType.Normal}
                  onChange={(e) =>
                    onChangeUserCertification(user.userId, {
                      title: e.target.value,
                    })
                  }
                />
              </td>
              <td className="border-gray-300 border-[1px] py-3 w-36">
                <input
                  type="date"
                  value={user.certificationDate}
                  className="w-[135px] h-8 box-border border-gray-400 border-[1px] p-[6px] outline-none rounded-md flex-grow focus:border-primary focus:border-2"
                  onChange={(e) =>
                    onChangeUserCertification(user.userId, {
                      certificationDate: e.target.value,
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center w-full">
        <button
          className="py-2 px-6 rounded-md bg-primary text-white mt-4 w-full"
          onClick={onSubmit}
        >
          발급
        </button>
      </div>
      
    </div>
  );
}

export default CertificationTable;
