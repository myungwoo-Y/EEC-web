import React from 'react';
import {
  FieldErrors,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type DateProps = {
  className?: string;
  name?: string;
  register?: UseFormRegister<Record<string, any>>;
  errors?: FieldErrors<FieldValues>;
  option?: RegisterOptions<Record<string, any>, string>;
  firstDateName: string;
  secondDateName: string;
  disabled?: boolean;
};

function Date({
  className = '',
  name,
  register,
  errors,
  firstDateName,
  secondDateName,
  option,
  disabled = false,
}: DateProps) {
  return (
    <div className={`${className} `}>
      {name && <div>{name}</div>}
      <div className="flex justify-between items-center mt-1">
        {register ? (
          <>
            <input
              type="date"
              className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              disabled={disabled}
              {...register(firstDateName, option)}
            />
            <span className="text-gray-400 mx-4">~</span>
            <input
              type="date"
              className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              disabled={disabled}
              {...register(secondDateName, option)}
            />
          </>
        ) : (
          <>
            <input
              type="date"
              className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              disabled={disabled}
            />
            <span className="text-gray-400 mx-4">~</span>
            <input
              type="date"
              className="box-border border-gray-400 border-[1px] p-[6px] bg-gray-50 outline-none rounded-md flex-grow focus:border-primary focus:border-2"
              disabled={disabled}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Date;
