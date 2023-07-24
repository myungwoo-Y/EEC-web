'use client';

import React, { useState } from 'react';
import {
  UseFormRegister,
  RegisterOptions,
  UseFormWatch,
  FieldValues,
} from 'react-hook-form';

interface SelectProps {
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => any;
  children: React.ReactNode;
  label?: string;
  className?: string;
  error?: string;
  register?: UseFormRegister<Record<string, any>>;
  option?: RegisterOptions<Record<string, any>, string>;
  name?: string;
  watch?: UseFormWatch<FieldValues>;
  defaultValue?: string | number
}

function Select({
  onChange,
  children,
  label,
  className,
  error,
  register,
  option,
  name = '',
  watch,
  defaultValue = '',
}: SelectProps) {
  const [isClick, setIsClick] = useState<boolean>(false);
  return (
    <div className={className ? className : ''}>
      {label && <label className="block mb-1">{label}</label>}
      {register ? (
        <select
          className={`border-[1px] border-gray-300 rounded-md py-1 px-3 focus:bg-white focus:border-primary w-full appearance-none bg-[url('/icon/caret-down-solid.svg')] bg-[length:12px_12px] bg-no-repeat bg-right 
            ${watch && watch(name) ? 'text-black' : 'text-gray-400'}
            ${error && 'border-red-600'}`}
          style={{ backgroundPositionX: 'calc(100% - 5px)' }}
          {...register(name, option)}
          value={watch && watch(name)}
        >
          {children}
        </select>
      ) : (
        <select
          className={`border-[1px] border-gray-300 rounded-md py-1 px-3 focus:bg-white focus:border-primary w-full appearance-none bg-[url('/icon/caret-down-solid.svg')] bg-[length:12px_12px] bg-no-repeat bg-right ${
            !isClick && 'text-gray-400'
          } ${error && 'border-red-600'}`}
          style={{ backgroundPositionX: 'calc(100% - 5px)' }}
          onChange={onChange}
          onClick={() => setIsClick(true)}
          defaultValue={defaultValue}
        >
          {children}
        </select>
      )}
      {error && <div className="text-red-600 mt-1">{error}</div>}
    </div>
  );
}

export default Select;
