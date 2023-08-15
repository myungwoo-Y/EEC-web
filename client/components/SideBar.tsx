'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  PencilIcon,
  PresentationChartBarIcon,
  DocumentMagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/services/post';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/features/post/postSlice';
import { useGetClassesQuery } from '@/services/class';
import { setClasses } from '@/features/class/classSlice';
import { usePathname } from 'next/navigation';

function SideBar() {
  const { data: categories } = useGetCategoriesQuery();
  const { data: classes } = useGetClassesQuery();
  const [selectedMenu, setSelectedMenu] = useState<
    '' | 'board' | 'class' | 'report'
  >('');
  const dispatch = useDispatch();
  const pathname = usePathname();

  const isSelectBoard = selectedMenu === 'board';
  const isSelectClass = selectedMenu === 'class';
  const isSelectReport = selectedMenu === 'report';

  useEffect(() => {
    dispatch(setCategories({ categories: categories || [] }));
  }, [categories, dispatch]);

  useEffect(() => {
    dispatch(setClasses(classes || []));
  }, [classes, dispatch]);

  return (
    <div className="bg-secondary min-h-screen hidden lg:block min-w-[200px] w-[200px]">
      <div className="mb-6 w-full py-5 px-2">
        <Link href="/" className="relative">
          <Image
            src="https://nowzone.b-cdn.net/eec/logo.png"
            alt="home"
            width={200}
            height={40}
            className="w-fit px-3 py-5"
          />
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 rounded-md"></div>
        </Link>
      </div>
      <Link
        href="/"
        className={`flex text-[16px] text-white items-center mx-3 px-3 py-3 hover:bg-primary rounded-xl ${
          pathname === '/' ? 'bg-primary' : ''
        }`}
      >
        <HomeIcon width="18" height="18" className="mr-2" /> HOME
      </Link>
      <Link
        href="/class"
        className={`flex text-[16px] text-white items-center my-2 mx-3 px-3 py-3 hover:bg-primary transition-colors rounded-xl ${
          pathname === '/class' ? 'bg-primary' : ''
        }`}
      >
        <DocumentMagnifyingGlassIcon width="18" height="18" className="mr-2" />{' '}
        수강신청
      </Link>
      <div
        className="flex text-[16px] text-white items-center justify-between  my-2 mx-3 px-3 py-3 hover:bg-primary rounded-xl"
        onClick={() => setSelectedMenu(isSelectClass ? '' : 'class')}
      >
        <div className="flex items-center">
          <PencilIcon width="18" height="18" className="mr-2" />
          강의관리
        </div>
        {isSelectClass ? (
          <ChevronUpIcon width="18" height="18" className="float-right" />
        ) : (
          <ChevronDownIcon width="18" height="18" className="float-right" />
        )}
      </div>
      {isSelectClass &&
        classes &&
        classes.map((data) => {
          return (
            <Link
              key={data.classId}
              href={`/class/${data.classId}/lectures`}
              className={`flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl ${
                pathname === '/class/' + data.classId + '/lectures'
                  ? 'bg-primary'
                  : ''
              }`}
            >
              {data.title}
            </Link>
          );
        })}
      {isSelectClass && (
        <>
          <Link
            href={`/category/4`}
            className={`flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl ${
              pathname === '/category/4' ? 'bg-primary' : ''
            }`}
          >
            자료실
          </Link>
          <Link
            href={`/category/5`}
            className={`flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl ${
              pathname === '/category/5' ? 'bg-primary' : ''
            }`}
          >
            교육수료심사
          </Link>
        </>
      )}
      <div
        className="flex text-[16px] text-white items-center justify-between  my-2 mx-3 px-3 py-3 hover:bg-primary rounded-xl"
        onClick={() => setSelectedMenu(isSelectBoard ? '' : 'board')}
      >
        <div className="flex items-center">
          <ClipboardDocumentListIcon width="18" height="18" className="mr-2" />
          게시판
        </div>
        {isSelectBoard ? (
          <ChevronUpIcon width="18" height="18" className="float-right" />
        ) : (
          <ChevronDownIcon width="18" height="18" className="float-right" />
        )}
      </div>
      {isSelectBoard &&
        categories &&
        categories.map((category, idx) => {
          if (idx > 2) return null;
          return (
            <Link
              key={category.categoryId}
              href={`/category/${category.categoryId}`}
              className={`flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl ${
                pathname === '/category/' + category.categoryId
                  ? 'bg-primary'
                  : ''
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      <div
        className="flex text-[16px] text-white items-center justify-between  my-2 mx-3 px-3 py-3 hover:bg-primary rounded-xl"
        onClick={() => setSelectedMenu(isSelectReport ? '' : 'report')}
      >
        <div className="flex items-center">
          <PresentationChartBarIcon width="18" height="18" className="mr-2" />{' '}
          역학조사보고
        </div>
        {isSelectReport ? (
          <ChevronUpIcon width="18" height="18" className="float-right" />
        ) : (
          <ChevronDownIcon width="18" height="18" className="float-right" />
        )}
      </div>
      {isSelectReport && (
        <>
          <Link
            href={`/report`}
            className={`flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl ${
              pathname === '/report' ? 'bg-primary' : ''
            }`}
          >
            분기실적보고
          </Link>
        </>
      )}
    </div>
  );
}

export default SideBar;
