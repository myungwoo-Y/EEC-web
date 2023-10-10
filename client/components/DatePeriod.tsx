import React from 'react';
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type DateProps = {
  className?: string;
  inputClassName?: string;
  name?: string;
  register?: UseFormRegister<Record<string, any>>;
  errors?: FieldErrors<FieldValues>;
  option?: RegisterOptions<Record<string, any>, string>;
  firstDateName: string;
  secondDateName: string;
  disabled?: boolean;
  gap?: number;
};

function DatePeriod({
  className = '',
  inputClassName = '',
  name,
  register,
  errors,
  firstDateName,
  secondDateName,
  option,
  disabled = false,
  gap = 4,
}: DateProps) {
  return (
    <div className={`${className}`}>
      {name && <div className="mb-1">{name}</div>}
      <div className="flex justify-between items-center h-full">
        {register ? (
          <div className={`w-full flex items-center gap-${gap}`}>
            <input
              type="date"
              className={`box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2 ${inputClassName}`}
              disabled={disabled}
              {...register(firstDateName, option)}
            />
            <span className="text-gray-400">~</span>
            <input
              type="date"
              className={`box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2 ${inputClassName}`}
              disabled={disabled}
              {...register(secondDateName, option)}
            />
          </div>
        ) : (
          <div className={`w-full flex gap-${gap}`}>
            <input
              type="date"
              className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              disabled={disabled}
            />
            <span className="text-gray-400">~</span>
            <input
              type="date"
              className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DatePeriod;
