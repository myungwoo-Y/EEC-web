import React from 'react';
import tableStyles from '../table/Table.module.scss';
import classNames from 'classnames';
import UploadFiles from '../UploadFiles';
import { fileNames } from '@/model/report';

type FileTableProps = {
  files: File[][];
  setFiles: (newFiles: File[], pos: number) => void;
};

function FileTable({ files, setFiles }: FileTableProps) {
  return (
    <div className="mt-7">
      <p className="text-xl font-semibold">첨부자료</p>
      <table
        className={classNames(
          tableStyles.borderTd,
          'w-full mt-2 border-t-2 border-t-black'
        )}
      >
        <tbody>
          {fileNames.map((fileName, idx) => (
            <tr key={fileName}>
              <td className="text-center px-10 w-56">{fileName}</td>
              <td className="px-4 pt-6">
                <UploadFiles
                  files={files[idx]}
                  setFiles={(newFiles: File[]) => setFiles(newFiles, idx)}
                  name={fileName}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileTable;
