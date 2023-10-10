import { TBody, THead, Table, TableContainer, Td, Th, Tr } from '@/components/Table';
import TextArea from '@/components/TextArea';
import { toSixBirthday } from '@/lib/date';
import { User } from '@/model/user';
import React from 'react';

type UserResultTableProps = {
  users: User[] | undefined;
};

function UserResultTable({ users }: UserResultTableProps) {
  return (
    <TableContainer className='mt-10 max-h-[800px]'>
      <Table className="w-[1500px]">
        <THead>
          <Tr>
            <Th rowSpan={3} className="w-12">
              연변
            </Th>
            <Th colSpan={5}>교육생</Th>
            <Th colSpan={3}>신규교육이수일</Th>
            <Th rowSpan={3}>
              실적보고서 <br /> 제출 횟수
            </Th>
            <Th rowSpan={3}>
              역학조사 <br /> 분석보고서 <br /> (제목/제출일)
            </Th>
            <Th rowSpan={3}>신규교육수료일</Th>
            <Th colSpan={5}>보수교육이수일</Th>
            <Th rowSpan={3} className='w-30'>기타</Th>
          </Tr>
          <Tr>
            <Th rowSpan={2} className="w-12">
              기수
            </Th>
            <Th rowSpan={2}>소속</Th>
            <Th rowSpan={2}>직급</Th>
            <Th rowSpan={2}>성명</Th>
            <Th rowSpan={2}>생년월일</Th>
            <Th colSpan={2}>1년차</Th>
            <Th>2년차</Th>
            <Th rowSpan={2}>1회차</Th>
            <Th rowSpan={2}>2회차</Th>
            <Th rowSpan={2}>3회차</Th>
            <Th rowSpan={2}>4회차</Th>
            <Th rowSpan={2}>5회차</Th>
          </Tr>
          <Tr>
            <Th>기본교육</Th>
            <Th>실무교육</Th>
            <Th>실무교육</Th>
          </Tr>
        </THead>
        <TBody>
          {users?.map((user, idx) => (
            <Tr key={user.userId}>
              <Td>{idx + 1}</Td>
              <Td>{user.classOrder}</Td>
              <Td>{user.department}</Td>
              <Td>{user.jobLevel}</Td>
              <Td>{user.name}</Td>
              <Td>{toSixBirthday(user.birthday)}</Td>
              <Td>1년차</Td>
              <Td>1년차</Td>
              <Td>2년차</Td>
              <Td>{user.reports?.length || 0}</Td>
              <Td>보고서 이름</Td>
              <Td>{/* 수료일 */}</Td>
              <Td>{/* 1회차 */}</Td>
              <Td>{/* 2회차 */}</Td>
              <Td>{/* 3회차 */}</Td>
              <Td>{/* 4회차 */}</Td>
              <Td>{/* 5회차 */}</Td>
              <Td><TextArea value={user.memo} setValue={() => null} /></Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </TableContainer>
  );
}

export default UserResultTable;
