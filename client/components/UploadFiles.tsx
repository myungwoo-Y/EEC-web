import { ArchiveBoxArrowDownIcon, ArrowDownOnSquareIcon, ArrowDownOnSquareStackIcon, ArrowUpOnSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import React, { Dispatch, SetStateAction } from 'react';

type UploadFilesProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

function UploadFiles({ files, setFiles }: UploadFilesProps) {
  return (
    <div>
      <div className="mt-2">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center mt-1">
            <input type="checkbox" value="false" />
            <div>
              {idx + 1}. {file.name}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex text-gray-600 text-sm">
        <label
          htmlFor="file-upload"
          className="w-20 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1"
        >
          <ArrowUpOnSquareIcon width={14} className="mr-1" />
          <p>업로드</p>
        </label>
        <input id="file-upload" type="file" className="hidden" />
        <button className="ml-2 w-24 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1">
          <TrashIcon width={14} className="mr-1" />선택삭제
        </button>
        <button className="ml-2 w-32 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1">
          <ArrowDownOnSquareIcon width={14} className="mr-1" /> 선택 다운로드
        </button>
        <button className="ml-2 w-32 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1">
          <ArrowDownOnSquareStackIcon width={14} className="mr-1" /> 전체 다운로드
        </button>
      </div>
    </div>
  );
}

export default UploadFiles;
