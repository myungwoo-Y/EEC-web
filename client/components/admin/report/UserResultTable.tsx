import TextArea from '@/components/TextArea';
import { toSixBirthday } from '@/lib/date';
import { User } from '@/model/user';
import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type TableProps = {
  className?: string;
};

type TableSpan = {
  colSpan?: number;
  rowSpan?: number;
};

function TableContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('overflow-x-auto overflow-y-auto', className)}>{children}</div>
  );
}

function THead({ className, children }: PropsWithChildren<TableProps>) {
  return (
    <thead className={classNames('bg-gray-100', className)}>{children}</thead>
  );
}

function TBody({ className, children }: PropsWithChildren<TableProps>) {
  return <tbody className={className}>{children}</tbody>;
}

function Th({
  className,
  children,
  rowSpan,
  colSpan,
}: PropsWithChildren<TableProps & TableSpan>) {
  return (
    <th
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={classNames(
        'border-gray-300 border-[1px] border-t-black py-3',
        className
      )}
    >
      {children}
    </th>
  );
}

function Td({
  className,
  children,
  rowSpan,
  colSpan,
}: PropsWithChildren<TableProps & TableSpan>) {
  return (
    <td
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={classNames(
        'border-gray-300 border-[1px] border-t-black py-3 px-1 text-center',
        className
      )}
    >
      {children}
    </td>
  );
}

function Tr({ className, children }: PropsWithChildren<TableProps>) {
  return <tr className={className}>{children}</tr>;
}

function Table({ className, children }: PropsWithChildren<TableProps>) {
  return <table className={classNames('w-full', className)}>{children}</table>;
}

type UserResultTableProps = {
  users: User[] | undefined;
};

function UserResultTable({ users }: UserResultTableProps) {
  return (
    <TableContainer className='mt-10 max-h-[800px]'>
      <Table className="min-w-[1700px]">
        <THead>
          <Tr>
            <Th rowSpan={3} className="w-12">
              연변
            </Th>
            <Th colSpan={5}>교육생</Th>
            <Th colSpan={3}>신규교육이수일</Th>
            <Th rowSpan={3} className="w-28">
              실적보고서 <br /> 제출 횟수
            </Th>
            <Th rowSpan={3} className="w-28">
              역학조사 <br /> 분석보고서 <br /> (제목/제출일)
            </Th>
            <Th rowSpan={3} className="w-28">신규교육수료일</Th>
            <Th colSpan={5}>보수교육이수일</Th>
            <Th rowSpan={3} className='w-30'>기타</Th>
          </Tr>
          <Tr>
            <Th rowSpan={2} className="w-12">
              기수
            </Th>
            <Th rowSpan={2} className="w-52">소속</Th>
            <Th rowSpan={2} className='w-24'>직급</Th>
            <Th rowSpan={2} className="w-20">성명</Th>
            <Th rowSpan={2}>생년월일</Th>
            <Th colSpan={2}>1년차</Th>
            <Th className="w-20">2년차</Th>
            <Th rowSpan={2} className="w-16">1회차</Th>
            <Th rowSpan={2} className="w-16">2회차</Th>
            <Th rowSpan={2} className="w-16">3회차</Th>
            <Th rowSpan={2} className="w-16">4회차</Th>
            <Th rowSpan={2} className="w-16">5회차</Th>
          </Tr>
          <Tr>
            <Th className="w-20">기본교육</Th>
            <Th className="w-20">실무교육</Th>
            <Th className="w-20">실무교육</Th>
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
              <Td>{user.simpleReport?.title || ''}</Td>
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
