"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HomeIcon, ClipboardDocumentListIcon, PencilIcon, PresentationChartBarIcon, DocumentMagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useGetCategoriesQuery } from '@/services/post';
import { useDispatch } from 'react-redux';
import { setCategories } from '@/features/post/postSlice';


function SideBar() {
  const { data: categories } = useGetCategoriesQuery('');
  const [isSelectBoard, setIsSelectBoard] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories({categories: categories || []}));
  }, [categories, dispatch])
  
  return (
    <div className="bg-secondary min-h-screen max-h-fit">
      <div className="px-8 pt-7 mb-16">
        <Image
          src="https://nowzone.b-cdn.net/eec/logo.png"
          alt="home"
          width="170"
          height="40"
        />
      </div>
      <Link
        href="/"
        className="flex text-[16px] text-white items-center mx-3 px-3 py-3 hover:bg-primary rounded-xl"
      >
        <HomeIcon width="18" height="18" className="mr-2" /> HOME
      </Link>
      <Link
        href="/"
        className="flex text-[16px] text-white items-center my-2 mx-3 px-3 py-3 hover:bg-primary transition-colors rounded-xl"
      >
        <DocumentMagnifyingGlassIcon width="18" height="18" className="mr-2" />{' '}
        수강신청
      </Link>
      <Link
        href="/"
        className="flex text-[16px] text-white items-center my-2 mx-3 px-3 py-3 hover:bg-primary rounded-xl"
      >
        <PencilIcon width="18" height="18" className="mr-2" /> 강의관리
      </Link>
      <div
        className="flex text-[16px] text-white items-center justify-between  my-2 mx-3 px-3 py-3 hover:bg-primary rounded-xl"
        onClick={() => setIsSelectBoard(!isSelectBoard)}
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
