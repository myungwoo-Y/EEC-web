import React from 'react';
import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import dayjs from 'dayjs';

type DateProps = {
  className?: string;
  name: string;
  register: UseFormRegister<Record<string, any>>;
  errors?:FieldErrors<FieldValues>;
  option?: RegisterOptions<Record<string, any>, string>;
  firstDateName: string;
  secondDateName: string;
}

function Date({ className = '', name, register, errors, firstDateName, secondDateName, option }: DateProps) {
  const defaultDate = dayjs().format('YYYY-MM-DD');
  return (
    <div className={`${className} `}>
      <div>{name}</div>
      <div className="flex justify-between items-center mt-1">
        <input
          type="date"
          className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
          {...register(firstDateName, option)}
          defaultValue={defaultDate}
        />
        <span className="text-gray-400 mx-4">~</span>
        <input
          type="date"
          className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
          {...register(secondDateName, option)}
          defaultValue={defaultDate}
        />
      </div>
    </div>
  );
}

export default Date;