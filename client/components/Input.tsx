import React, { HTMLInputTypeAttribute } from 'react';

interface InputProps {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  value: string;
  label?: string;
}

export default function Input({
  className = '',
  placeholder = '',
  label = '',
  onChange,
  type,
  value,
}: InputProps) {
  return (
    <div className={className}>
      <label className="block mb-1">{label}</label>
      <input
        className='border-[1px] border-gray-300 rounded-md py-1 px-3 bg-[#F5F7F9] focus:bg-white focus:border-primary w-full'
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}
