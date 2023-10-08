import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';

type ButtonVariant = 'solid' | 'outline';

type ButtonColor = 'pirmary' | 'gray';

type ButtonProps = {
  className?: string;
  onClick: () => void;
  variant?: ButtonVariant;
  color?: ButtonColor;
};

function Button({
  className,
  children,
  onClick,
  variant = 'outline',
  color = 'pirmary',
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        variant === 'outline' &&
          `border-[1px] rounded-md w-fit px-4 py-1 ${color === 'pirmary' ? 'text-primary border-primary': ''} ${color === 'gray' ? 'text-gray-400 border-gray-400': ''}`,
        variant === 'solid' &&
          `text-white rounded-md w-fit px-4 py-1 ${color === 'pirmary' ? 'bg-primary': ''} ${color === 'gray' ? 'bg-gray-400': ''}`,
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
