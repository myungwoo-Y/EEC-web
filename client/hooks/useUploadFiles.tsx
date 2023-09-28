import { File, FileMeta } from "@/model/file";
import { useAddFilesMutation } from "@/services/file";
import { useEffect, useState } from "react";

type UseUploadFiles = {
  files: File[],
  setFiles: (v: File[]) => void;
}

function useUploadFiles({ files, setFiles }: UseUploadFiles) {
  const [checkedStatus, setCheckedStatus] = useState<boolean[]>([]);
  const [addFiles, { isSuccess, isError, isLoading, data }] = useAddFilesMutation();

  useEffect(() => {
    if (data && data.length > 0) {
      setFiles([...files, ...data]);
    }
  }, [data])

  useEffect(() => {
    if (files.length > checkedStatus.length) {
      setCheckedStatus([...checkedStatus, false]);
    }
  }, [files, checkedStatus]);

  // upload One file
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('files', file);

      addFiles(formData);
    }
  };

  return [
    checkedStatus,
    setCheckedStatus,
    onUpload,
    { isSuccess, isError, isLoading },
  ] as const;
}

export default useUploadFiles
