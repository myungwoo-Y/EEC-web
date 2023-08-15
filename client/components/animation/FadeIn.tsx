import React from 'react';
import { Transition } from '@headlessui/react';

type FadeInProps = {
  children: JSX.Element;
  isShow: boolean;
};

function FadeIn({ children, isShow }: FadeInProps) {
  return (
    <Transition
      show={isShow}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}

export default FadeIn;
