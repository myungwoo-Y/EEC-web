import React from 'react';
import InputWithIcon from '../InputIcon';
import classNames from 'classnames';

type FilterProps = {
  setData: (value: string) => void;
  Icon: React.ForwardRefExoticComponent<any>;
  placeholder: string;
  name: string;
  className: string;
};

function Filter({ setData, Icon, placeholder, name, className }: FilterProps) {
  return (
    <InputWithIcon
      type="number"
      className={classNames('w-32 h-8', className)}
      name={name}
      placeholder={placeholder}
      Icon={Icon}
      onChange={(e) => setData(e.target.value)}
    />
  );
}

export default Filter;
