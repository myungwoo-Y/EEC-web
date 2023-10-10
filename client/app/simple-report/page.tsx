'use client';

import Button from '@/components/Button';
import Date from '@/components/Date';
import Input from '@/components/Input';
import { TBody, THead, Table, Td, Th, Tr } from '../../components/Table';
import { selectCurrentUser } from '@/features/auth/authSlice';
import { toInputDate } from '@/lib/date';
import { useUpdateSimpleReportMutation } from '@/services/user';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function SimpleReport() {
  const user = useSelector(selectCurrentUser);
  const [updateSimpleReport, { isSuccess, isError }] = useUpdateSimpleReportMutation();

  const [title, setTitle] = useState('');
  const [submitDate, setSubmitDate] = useState('');

  useEffect(() => {
    setTitle(user?.simpleReport?.title || '');
    setSubmitDate(user?.simpleReport?.submitDate || '');
  }, [user]);

  useEffect(() => {
    if (isError) {
      alert('저장에 실패했습니다');
    } else if (isSuccess) {
      alert('저장을 완료헀습니다.');
    }
  }, [isSuccess, isError]);

  const onSave = () => {
    if (user?.userId) {
      const simpleReport = user.simpleReport;
      updateSimpleReport({
        userId: user?.userId,
        updateSimpleReport: {
          simpleReportId: simpleReport?.simpleReportId || null,
          title,
          submitDate
        }
      })
    } else {
      alert('저장에 실패했습니다');
    }
  }

  const onCancel = () => {
    setTitle('');
    setSubmitDate('');
  }

  return (
    <div className="pt-4 lg:pt-10 px-2 lg:px-12">
      <div className="font-bold text-2xl mb-10">역학조사 분석 보고서</div>
      <Table>
        <THead>
          <Tr>
            <Th className="w-12">기수</Th>
            <Th>소속</Th>
            <Th>직급</Th>
            <Th>성명</Th>
            <Th>제목</Th>
            <Th className="w-28">제출일</Th>
          </Tr>
        </THead>
        <TBody>
          <Tr>
            <Td>
              {user?.classOrder}
            </Td>
            <Td>
              {user?.department}
            </Td>
            <Td>
              {user?.jobLevel}
            </Td>
            <Td>
              {user?.name}
            </Td>
            <Td>
              <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='mx-3' />
            </Td>
            <Td>
              <Date value={toInputDate(submitDate)} onChange={(date) => setSubmitDate(date)} className='mx-3' />
            </Td>
          </Tr>
        </TBody>
      </Table>
      <div className='float-right mt-8 gap-4 flex h-10'>
        <Button onClick={onCancel} variant='solid' color='gray' className='px-6'>취소</Button>
        <Button onClick={onSave} variant='solid' className='px-6'>저장</Button>
      </div>
    </div>
  );
}

export default SimpleReport;
