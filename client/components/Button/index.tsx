import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'

type ButtonProps = {
  className?: string,
  onClick: () => void;
}

function Button({ className, children, onClick }: PropsWithChildren<ButtonProps>) {
  return (
    <button onClick={onClick} className={classNames('border-[1px] text-primary border-primary rounded-md w-fit px-4 py-1', className)}>{children}</button>
  )
}

export default Button