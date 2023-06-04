import React from 'react';

interface InputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  type: 'email' | 'password';
  value: string;
}

export default function Input({
  className = '',
  placeholder = '',
  onChange,
  type,
  value
}: InputProps) {
  return (
    <>
      <input
        className={
          className + ' border-[1px] border-gray-300 rounded-md w-72 py-1 px-3 bg-[#F5F7F9] focus:bg-white focus:border-primary'
        }
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
}
