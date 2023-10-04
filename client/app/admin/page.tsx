'use client';

import Certification from '@/components/admin/certification';
import ResultTable from '@/components/admin/certification/CertificationHistoryTable';
import ClassManagement from '@/components/admin/ClassManagement';
import UserManagement from '@/components/admin/user';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { UserRole } from '@/model/user';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const menus = [
  '회원 관리',
  '증명서 발급',
  '증명서 발급내역',
  // '교육생관리',
  '교과목관리',
];

function Admin() {
  const [menuIdx, setMenuIdx] = useState(0);
  const user = useSelector(selectCurrentUser);
  const router = useRouter();
  const isAdmin = user?.role === UserRole.ADMIN;

  useEffect(() => {
    if (user && !isAdmin) {
      router.push('/');
    }
  }, [user]);

  const renderContents = () => {
    switch (menuIdx) {
      case 0:
        return <UserManagement />;
      case 1:
        return <Certification />;
      case 2:
        return <ResultTable />;
      case 3:
        return <ClassManagement />;
      // case 4:
      //   return <ClassManagement />;
    }

    return null;
  };

  return (
    <>
      {isAdmin && (
        <div className="py-5 lg:py-10 px-3 lg:px-12">
          <p className="font-bold text-2xl">관리자</p>
          <div className="mt-8 w-auto lg:w-[900px] flex rounded-sm border-[1px] border-gray-300">
            {menus.map((menu, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`px-5 py-3 text-center flex-1 cursor-pointer ${
                    menuIdx === idx
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setMenuIdx(idx)}
                >
                  {menu}
                </div>
                {idx < menus.length - 1 && (
                  <div className="divide-y-2 w-[1px] bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="mt-8">{renderContents()}</div>
        </div>
      )}
    </>
  );
}

export default Admin;
