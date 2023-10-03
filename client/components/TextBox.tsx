import React from 'react';

type TextBoxProps = {
  children: JSX.Element | string | number;
};

function TextBox({ children }: TextBoxProps) {
  return (
    <div className="border-[1px] border-gray-300 rounded-md py-1 px-3">
      {children}
    </div>
  );
}

export default TextBox;
