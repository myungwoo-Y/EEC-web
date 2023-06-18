import React, { HTMLInputTypeAttribute } from 'react';
import { UseFormRegister, RegisterOptions } from "react-hook-form"

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  type: HTMLInputTypeAttribute;
  value?: string;
  label?: string;
  error?: string;
  autoComplete?: string;
  register?: UseFormRegister<Record<string, any>>;
  option?: RegisterOptions<Record<string, any>, string>;
  name?: string;
}

export default function Input({
  className = '',
  label = '',
  error,
  register,
  option,
  name = '',
  ...props
}: InputProps) {
  return (
    <div className={className}>
      <label className="block mb-1">{label}</label>
      {register ?
        <input
          className={`border-[1px] border-gray-300 rounded-md py-1 px-3 bg-[#F5F7F9] focus:bg-white focus:border-primary w-full ${error && 'border-red-600'}`}
          {...register(name, option)}
        />  
      :
      <input
          className={`border-[1px] border-gray-300 rounded-md py-1 px-3 bg-[#F5F7F9] focus:bg-white focus:border-primary w-full ${error && 'border-red-600'}`}
          {...props}
      />
      }
      
      {error && <div className="text-red-600 mt-1">{error}</div>}
    </div>
  );
}
