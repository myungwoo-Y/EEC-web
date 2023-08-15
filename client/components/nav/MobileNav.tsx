'use client';

import { User } from '@/model/user';
import Image from 'next/image';
import React, { useState } from 'react';
import classNames from 'classnames';
import SideBar from '../SideBar';
import Link from 'next/link';
import FadeIn from '../animation/FadeIn';
import { Transition } from '@headlessui/react';

type MobileNavProps = {
  user: User | null;
};

function MobileNav({ user }: MobileNavProps) {
  const [isHamburgerClick, setIsHamburgerClick] = useState(false);

  return (
    <>
      <div className="h-14 flex justify-between items-center px-4 bg-secondary text-white">
        <Link href="/">
          <Image
            src="https://nowzone.b-cdn.net/eec/logo.png"
            width={80}
            height={32}
            alt="goverment logo"
            className="w-fit"
          />
        </Link>
        <div
          className="flex flex-col items-center justify-center cursor-pointer w-5 h-5 "
          onClick={() => setIsHamburgerClick(!isHamburgerClick)}
        >
          <div
            className={classNames(
              'w-5 h-0.5 bg-white  duration-200',
              isHamburgerClick ? 'rotate-45 translate-y-1' : ''
            )}
          ></div>
          <div
            className={classNames(
              'w-5 h-0.5 bg-white  mt-2 duration-200',
              isHamburgerClick ? '-rotate-45 -translate-y-[6px]' : ''
            )}
          ></div>
        </div>
      </div>

      <FadeIn isShow={isHamburgerClick}>
        <div className="w-full h-full z-10 backdrop-blur-sm absolute"></div>
      </FadeIn>
      <Transition
        show={isHamburgerClick}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="relative z-50"
      >
        <SideBar
          className="absolute z-50 right-0 min-w-[90%]"
          isShowLogo={false}
        >
          <div>hello</div>
        </SideBar>
      </Transition>
    </>
  );
}

export default MobileNav;
