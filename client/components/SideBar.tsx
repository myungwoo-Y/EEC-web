"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HomeIcon, ClipboardDocumentListIcon, PencilIcon, PresentationChartBarIcon, DocumentMagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/services/post';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/features/post/postSlice';
import { useGetClassesQuery } from '@/services/class';
import { setClasses } from '@/features/class/classSlice';


function SideBar() {
  const { data: categories } = useGetCategoriesQuery('');
  const { data: classes } = useGetClassesQuery();
  const [selectedMenu, setSelectedMenu] = useState<'' | 'board' | 'class'>('');
  const dispatch = useDispatch();

  const isSelectBoard = selectedMenu === 'board';
  const isSelectClass = selectedMenu === 'class';

  useEffect(() => {
    dispatch(setCategories({categories: categories || []}));
  }, [categories, dispatch])

  useEffect(() => {
    dispatch(setClasses(classes || []));
  }, [classes, dispatch])
  
  return (
    <div className="bg-secondary min-h-screen">
      <div className="px-8 pt-10 mb-16">
        <Image
          src="https://nowzone.b-cdn.net/eec/logo.png"
          alt="home"
          width={200}
          height={40}
          className="h-[40px]"
        />
      </div>
      <Link
        href="/"
        className="flex text-[16px] text-white items-center mx-3 px-3 py-3 hover:bg-primary rounded-xl"
      >
        <HomeIcon width="18" height="18" className="mr-2" /> HOME
      </Link>
      <Link
        href="/class"
        className="flex text-[16px] text-white items-center my-2 mx-3 px-3 py-3 hover:bg-primary transition-colors rounded-xl"
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
              className="flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl"
            >
              {data.title}
            </Link>
          );
        })}
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
        categories.map((category) => {
          return (
            <Link
              key={category.categoryId}
              href={`/category/${category.categoryId}`}
              className="flex text-[16px] text-white items-center mx-3 px-3 pl-10 py-3 hover:bg-primary rounded-xl"
            >
              {category.name}
            </Link>
          );
        })}
      <Link
        href="/"
        className="flex text-[16px] text-white items-center my-2 mx-3 px-3 py-3 hover:bg-primary rounded-xl"
      >
        <PresentationChartBarIcon width="18" height="18" className="mr-2" />{' '}
        역학조사보고
      </Link>
    </div>
  );
}

export default SideBar;
