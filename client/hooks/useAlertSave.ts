import { useEffect } from 'react';

type UseAlertSave = {
  isSuccess: boolean;
  isError: boolean;
  saveCount?: number;
};

function useAlertSave({ isSuccess, isError, saveCount }: UseAlertSave) {
  useEffect(() => {
    if (isSuccess) {
      const successMsg = saveCount
        ? `${saveCount}건 저장에 성공했습니다.`
        : '저장에 성공했습니다.';
      alert(successMsg);
      return;
    }

    if (isError) {
      alert('저장에 실패했습니다.');
    }

  }, [isSuccess, isError]);
}

export default useAlertSave;
