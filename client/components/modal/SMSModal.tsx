import { SendMessageDto } from '@/model/message';
import { User } from '@/model/user';
import { useSendSmsMutation } from '@/services/admin';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

type SMSModalProps = {
  closeModal: () => void;
  users: User[];
};

function SMSModal({ users, closeModal }: SMSModalProps) {
  const [sendSms, { isSuccess, isError }] = useSendSmsMutation();
  const [text ,setText] = useState('');

  if (isSuccess) {
    alert(`${users.length}건 문자 발송했습니다.`);
    closeModal();
  } else if (isError) {
    alert('전송에 실패해습니다. 관리자에게 문의해주세요');
    closeModal();
  }

  const onSubmit = () => {
    if (text.length > 45) {
      return alert('문자는 최대 45자 작성 가능합니다.')
    }
    const sendMessageDtos: SendMessageDto[] = users.map((user) => ({
      to: user.phoneNumber,
      from: process.env.NEXT_PUBLIC_PHONE || '',
      text
    }))
    sendSms(sendMessageDtos);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center overflow-y-scroll">
      <div className="bg-white w-[500px] rounded-md h-fit absolute top-1/4">
        <div className="bg-gray-50 flex rounded-tl-md rounded-tr-md justify-between px-4 py-4">
          <p className="font-bold text-lg">문자 알림 발송</p>
          <button onClick={closeModal}>
            <XMarkIcon width={24} />
          </button>
        </div>
        <div className="flex flex-col items-center p-5">
          <textarea
            rows={10}
            cols={20}
            className="w-full h-56 border-gray-200 border-2 appearance-none p-3 rounded-md active:border-primary resize-none"
            placeholder="문자를 입력해주세요."
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button
            className="py-2 px-6 rounded-md bg-primary text-white mt-3"
            onClick={onSubmit}
          >
            보내기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SMSModal;
