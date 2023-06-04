import React from 'react';

interface InputProps {
  className?: string;
  onChange?: () => void;
  placeholder?: string;
  type: 'email' | 'password';
}

export default function Input({
  className = '',
  onChange,
  placeholder,
  type,
}: InputProps) {
  return (
    <>
      <input
        className={
          className + ' border-[1px] border-gray-300 rounded-md w-72 py-1 px-2'
        }
        type={type}
      />
    </>
  );
}
