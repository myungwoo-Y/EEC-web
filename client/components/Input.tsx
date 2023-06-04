import React from 'react';

interface InputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  type: 'email' | 'password';
}

export default function Input({
  className = '',
  placeholder = '',
  onChange,
  type,
}: InputProps) {
  return (
    <>
      <input
        className={
          className + ' border-[1px] border-gray-300 rounded-md w-72 py-1 px-2'
        }
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
}
