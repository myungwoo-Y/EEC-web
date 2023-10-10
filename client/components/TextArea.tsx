import classNames from 'classnames';
import React from 'react';

type TextAreaProps = {
  value: string;
  setValue: (v: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
  cols?: number;
  name?: string;
};

function TextArea({
  value,
  setValue,
  rows = 5,
  cols = 10,
  className,
  name = '',
  placeholder
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      rows={rows}
      cols={cols}
      className={classNames(
        'border-gray-200 border-2 appearance-none p-2 rounded-md active:border-primary resize-none',
        className
      )}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      TextArea
    </textarea>
  );
}

export default TextArea;
