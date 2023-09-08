import {
  ArrowDownOnSquareIcon,
  ArrowDownOnSquareStackIcon,
  ArrowUpOnSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React, { useRef } from 'react';
import checkboxStyles from './Checkbox.module.scss';
import classNames from 'classnames';
import { File } from '@/model/file';
import useUploadFiles from '@/hooks/useUploadFiles';

type UploadFilesProps = {
  files: File[];
  setFiles: (v: File[]) => void
  name?: string;
  className?: string;
};

function UploadFiles({ className, files, setFiles, name = '' }: UploadFilesProps) {
  const [
    checkedStatus,
    setCheckedStatus,
    onUpload,
    { isSuccess, isError, isLoading },
  ] = useUploadFiles({files, setFiles});

  const linkRef = useRef<HTMLAnchorElement[]>([]);

  const isEmpty = !files || !files.length;

  const inputId = `upload-${name}`;

  const handleRemoveChecked = () => {
    setFiles(files.filter((_, idx) => !checkedStatus[idx]));
    setCheckedStatus(checkedStatus.filter((checked) => !checked));
  };

  const handleDownloadCheckedFiles = () => {
    linkRef.current.map((el, idx) => {
      if (checkedStatus[idx]) {
        el.click();
      }
    });
  };

  const handleDownloadFiles = () => {
    linkRef.current.map((el) => {
      el.click();
    })
  };

  return (
    <div className={classNames(className, 'mb-3', isEmpty ? 'pt-6' : '')}>
      <div className="mt-3">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center mt-1">
            <input
              type="checkbox"
              checked={checkedStatus[idx] ?? false}
              className={`mr-2 appearance-none ${checkboxStyles.rectangle}`}
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
            <a href={file.path} ref={(el) => {
              if (el) {
                linkRef.current[idx] = el
              }
            }}>
              {idx + 1}. {file.filename}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-4 flex text-gray-600 text-sm">
        <label
          htmlFor={inputId}
          className="w-20 flex items-center justify-center border-gray-400 border-[1px] rounded-md py-1 cursor-pointer"
        >
          <ArrowUpOnSquareIcon width={14} className="mr-1" />
          <p>업로드</p>
        </label>
        <input
          id={inputId}
          type="file"
          className="hidden"
          onChange={onUpload}
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
