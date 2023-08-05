import { debounce } from '@/lib/debounce';
import { getUserRoleName } from '@/lib/user';
import {
  CertificationUser,
  CheckedUser,
  User,
  UserRole,
  UserRoles,
} from '@/model/user';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ClassOrderOption from './ClassOrderOption';
import Input from './Input';
import Select from './Select';

type UserSelector<T> = {
  users: T[];
  setFilteredUsers: (users: T[]) => void;
};

function UserSelector<T extends CheckedUser>({
  users,
  setFilteredUsers,
}: UserSelector<T>) {
  const [name, setName] = useState('');
  const [classOrder, setClassOrder] = useState('');
  const [role, setRole] = useState('');
  const debounced = useRef(
    debounce<{
      name: string;
      classOrder: string;
      role: string;
      users: T[];
    }>(({ name, classOrder, role, users }) => {
      setFilteredUsers(
        users.filter((user) => {
          if (name && !user.name.includes(name)) {
            return false;
          }

          if (classOrder && parseInt(classOrder) != user.classOrder) {
            return false;
          }

          if (role && role !== user.role) {
            console.log(role);
            console.log(user.role);
            return false;
          }

          return true;
        })
      );
    }, 200)
  );

  useEffect(() => {
    // debounced.current({
    //   name,
    //   classOrder,
    //   role,
    //   users,
    // });
    setFilteredUsers(
      users.filter((user) => {
        if (name && !user.name.includes(name)) {
          return false;
        }

        if (classOrder && parseInt(classOrder) != user.classOrder) {
          return false;
        }

        if (role && role !== user.role) {
          console.log(role);
          console.log(user.role);
          return false;
        }

        return true;
      })
    );
  }, [name, classOrder, role, users]);

  return (
    <div className="flex flex-row-reverse items-center gap-4">
      <div className="flex items-center gap-1">
        <span>이름</span>
        <span>:</span>
        <Input
          type="text"
          className="w-32"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {/* <div className="flex items-center gap-1">
        <span>평가여부</span>
        <span>:</span>
        <Select className="w-24">
          <option disabled value=''>전체</option>
        </Select>
      </div> */}
      <div className="flex items-center gap-1">
        <span>구분</span>
        <span>:</span>
        <Select className="w-24" onChange={(e) => setRole(e.target.value)}>
          <option value="">전체</option>
          {UserRoles.map((role, idx) => {
            if (role === UserRole.ADMIN) {
              return null;
            }
            return (
              <option key={idx} value={role}>
                {getUserRoleName(role)}
              </option>
            );
          })}
        </Select>
      </div>
      <div className="flex items-center gap-1">
        <span>기수</span>
        <span>:</span>
        <Select
          className="w-24"
          onChange={(e) => setClassOrder(e.target.value)}
        >
          <option value="">전체</option>
          <ClassOrderOption />
        </Select>
      </div>
    </div>
  );
}

export default UserSelector;
