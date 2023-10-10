import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type TableProps = {
  className?: string;
};

type TableSpan = {
  colSpan?: number;
  rowSpan?: number;
};

export function TableContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={classNames('overflow-x-auto overflow-y-auto', className)}>{children}</div>
  );
}

export function THead({ className, children }: PropsWithChildren<TableProps>) {
  return (
    <thead className={classNames('bg-gray-100', className)}>{children}</thead>
  );
}

export function TBody({ className, children }: PropsWithChildren<TableProps>) {
  return <tbody className={className}>{children}</tbody>;
}

export function Th({
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

export function Td({
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
        'border-gray-300 border-[1px] border-t-black py-3 text-center',
        className
      )}
    >
      {children}
    </td>
  );
}

export function Tr({ className, children }: PropsWithChildren<TableProps>) {
  return <tr className={className}>{children}</tr>;
}

export function Table({ className, children }: PropsWithChildren<TableProps>) {
  return <table className={classNames('w-full', className)}>{children}</table>;
}