'use client';

import { User, UserRole } from '@/model/user';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import SideBar from '../SideBar';
import Link from 'next/link';
import FadeIn from '../animation/FadeIn';
import { Transition } from '@headlessui/react';
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  UserCircleIcon,
  UserIcon,
  UserMinusIcon,
} from '@heroicons/react/24/outline';
import { removeCredentials } from '@/features/auth/authSlice';
import NavItem from '../NavItem';
import { getUserRoleName } from '@/lib/user';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';

type MobileNavProps = {
  user: User | null;
};

function MobileNav({ user }: MobileNavProps) {
  const [isHamburgerClick, setIsHamburgerClick] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggle = () => setIsHamburgerClick(!isHamburgerClick);

  useEffect(() => {
    if (isHamburgerClick) {
      toggle();
    }
  }, [pathname]);

  useEffect(() => {
    if (isHamburgerClick) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, [isHamburgerClick]);

  return (
    <div className="overscroll-y-auto">
      <div
        className={classNames(
          'h-14 flex justify-between items-center px-4 bg-secondary text-white'
        )}
      >
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
          onClick={toggle}
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
        leave="transform transition ease-in-out duration-200"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="fixed z-50 w-full"
      >
        <SideBar className="float-right min-w-[90%] h-full" isShowLogo={false}>
          <div className="flex flex-col w-full h-14 py-4 px-6 gap-6 mt-10 text-white">
            {user ? (
              <>
                <div className="flex items-center">
                  <UserCircleIcon className="w-4 h-4 mr-1" />
                  {`${user.name}(${getUserRoleName(user.role)})님, 환영합니다`}
                </div>
                {user?.role === UserRole.ADMIN && (
                  <NavItem
                    text="서비스관리"
                    path="/admin"
                    Icon={Cog6ToothIcon}
                  />
                )}
                <NavItem
                  text="정보수정"
                  path="/update"
                  Icon={PencilSquareIcon}
                />
                <button
                  className="flex items-center hover:text-primary"
                  onClick={() => dispatch(removeCredentials())}
                >
                  <UserMinusIcon className="w-4 h-4 mr-1" /> 로그아웃
                </button>
              </>
            ) : (
              <>
                <NavItem
                  text="로그인"
                  path="/login"
                  Icon={ArrowRightOnRectangleIcon}
                />
                <NavItem
                  text="회원가입"
                  path="/signup"
                  className=""
                  Icon={UserIcon}
                />
              </>
            )}
          </div>
        </SideBar>
      </Transition>
    </div>
  );
}

export default MobileNav;
