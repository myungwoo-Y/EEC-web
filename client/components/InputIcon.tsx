import React, { HTMLInputTypeAttribute } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputWithIconProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any;
  type: HTMLInputTypeAttribute;
  label?: string;
  error?: string;
  autoComplete?: string;
  register?: UseFormRegister<Record<string, any>> | (() => any);
  option?: RegisterOptions<Record<string, any>, string>;
  name: string;
  disabled?: boolean;
  Icon: React.ForwardRefExoticComponent<any>;
  placeholder?: string;
  className?: string;
}

function InputWithIcon({error, register = () => null, name, option, disabled, Icon, placeholder = '', className = 'w-full', type}: InputWithIconProps) {
  return (
    <div className="relative">
      <Icon className="w-4 h-4 absolute top-1/2 left-1 -translate-y-1/2" />
      <input
        className={`border-[1px] border-gray-300 rounded-md py-1 pl-6 pr-3 focus:bg-white focus:border-primary ${className} ${
          error ? 'border-red-600' : ''
        } ${disabled ? 'text-gray-400 bg-gray-50' : ''}`}
        {...register(name, option)}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
}

export default InputWithIcon;
