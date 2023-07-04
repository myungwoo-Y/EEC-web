import { downloadFile } from '@/lib/downloadFile';
import {
  ArrowDownOnSquareIcon,
  ArrowDownOnSquareStackIcon,
  ArrowUpOnSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UploadFileProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  defaultMessage?: string;
  className?: string;
};

function UploadFile({ file, setFile, className = '', defaultMessage = '파일을 선택해주세요' }: UploadFileProps) {
  return (
    <div className={`${className} border-[1px] border-gray-300 p-2 flex items-center text-gray-600 text-sm rounded-md`}>
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
        onChange={(e) => {
          if (e.target.files?.length) {
            setFile(e.target.files[0]);
          }
        }}
      />
      <div className="ml-3" >
        <div>{file ? file.name : defaultMessage}</div>
      </div>
    </div>
  );
}

export default UploadFile;
