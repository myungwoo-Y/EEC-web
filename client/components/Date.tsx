import classNames from 'classnames';
import React from 'react';

type DateProps = {
  value?: string | undefined;
  onChange: (v: string) => void;
  className?: string;
};

function Date({ value, className, onChange }: DateProps) {
  return (
    <input
      type="date"
      className={classNames(
        'h-8 box-border border-gray-400 border-[1px] p-[6px] outline-none rounded-md flex-grow focus:border-primary focus:border-2',
        className
      )}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
}

export default Date;
