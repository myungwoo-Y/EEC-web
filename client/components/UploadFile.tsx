import { downloadFile } from '@/lib/downloadFile';
import {
  ArrowDownOnSquareIcon,
  ArrowDownOnSquareStackIcon,
  ArrowUpOnSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';

type UploadFileProps = {
  defaultMessage?: string;
  className?: string;
  name: string;
  register: UseFormRegister<Record<string, any>>;
  option?: RegisterOptions<Record<string, any>, string>;
  watch: UseFormWatch<FieldValues>;
  error?: string;
};

function UploadFile({
  name,
  register,
  option,
  watch,
  error,
  className = '',
  defaultMessage = '파일을 선택해주세요',
}: UploadFileProps) {
  const file = (watch(name) as FileList)?.[0];
  return (
    <div>
      <div
        className={`${className} border-[1px] border-gray-300 p-2 flex items-center text-gray-600 text-sm rounded-md ${error && 'border-red-600'}`}
      >
        <label
          htmlFor="file-upload"
          className="w-20 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1 cursor-pointer"
        >
          <ArrowUpOnSquareIcon width={14} className="mr-1" />
          <p>업로드</p>
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          {...register(name, option)}
        />
        <div className="ml-3">
          <div>{file ? file.name : defaultMessage}</div>
        </div>
      </div>
      {error && <p className="text-red-600 mt-1">{error}</p>}
    </div>
  );
}

export default UploadFile;
