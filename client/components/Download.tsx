import { downloadFile } from '@/lib/downloadFile';
import { PaperClipIcon } from '@heroicons/react/24/solid';
import React from 'react';

type DownloadProps = {
  path: string;
  fileName: string;
}

function Download({ path, fileName }: DownloadProps) {
  return (
    <div className="flex items-center cursor-pointer w-fit" onClick={() => downloadFile(path, fileName)}>
      <PaperClipIcon width={16} className="mr-1" />
      <a
        href={`/${path}`}
        download={fileName}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {fileName}
      </a>
    </div>
  );
}

export default Download;
