import { downloadFile } from '@/lib/downloadFile';
import {
  ArrowDownOnSquareIcon,
  ArrowDownOnSquareStackIcon,
  ArrowUpOnSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UploadFilesProps = {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
};

function UploadFiles({ files, setFiles }: UploadFilesProps) {
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>([]);

  useEffect(() => {
    if (files.length > checkedStatus.length) {
      setCheckedStatus([...checkedStatus, false]);
    }
  }, [files, checkedStatus]);

  const handleRemoveChecked = () => {
    setFiles(files.filter((_, idx) => !checkedStatus[idx]));
    setCheckedStatus(checkedStatus.filter((checked) => !checked));
  };

  const handleDownloadCheckedFiles = () => {
    files.map((file, idx) => {
      if (checkedStatus[idx]) {
        downloadFile(file);
      }
    });
  };

  const handleDownloadFiles = () => {
    files.map((file) => {
      downloadFile(file);
    });
  };

  return (
    <div className="mb-3">
      <div className="mt-3">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center mt-1">
            <input
              type="checkbox"
              checked={checkedStatus[idx] ?? false}
              className="mr-2 appearance-none"
              onChange={(e) => {
                setCheckedStatus(
                  checkedStatus.map((check, checkIdx) => {
                    if (idx === checkIdx) {
                      return e.target.checked;
                    }
                    return check;
                  })
                );
              }}
            />
            <div>
              {idx + 1}. {file.name}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex text-gray-600 text-sm">
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
              setFiles([...files, e.target.files[0]]);
            }
          }}
        />
        <button
          className="ml-2 w-24 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1"
          onClick={handleRemoveChecked}
        >
          <TrashIcon width={14} className="mr-1" /> 선택삭제
        </button>
        <button
          className="ml-2 w-32 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1"
          onClick={handleDownloadCheckedFiles}
        >
          <ArrowDownOnSquareIcon width={14} className="mr-1" /> 선택 다운로드
        </button>
        <button
          className="ml-2 w-32 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1"
          onClick={handleDownloadFiles}
        >
          <ArrowDownOnSquareStackIcon width={14} className="mr-1" /> 전체
          다운로드
        </button>
      </div>
    </div>
  );
}

export default UploadFiles;
