import Link from 'next/link';
import React from 'react';
import { HomeIcon, ClipboardDocumentListIcon, PencilIcon, PresentationChartBarIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';


function SideBar() {
  return (
    <div className="bg-secondary h-screen">
      <div className="px-8 pt-7 mb-16">
        <Image 
          src="https://nowzone.b-cdn.net/eec/logo.png"
          alt="home"
          width="170"
          height="40"
        />
      </div>
      <Link href="/" className="flex text-[16px] text-white items-center pl-5 py-5 hover:bg-primary">
        <HomeIcon width='18' height='18' className="mr-2"/> HOME
      </Link>
      <Link href="/" className="flex text-[16px] text-white items-center pl-5 py-5 hover:bg-primary">
        <DocumentMagnifyingGlassIcon width='18' height='18' className="mr-2"/> 수강신청
      </Link>
      <Link href="/" className="flex text-[16px] text-white items-center pl-5 py-5 hover:bg-primary">
        <PencilIcon width='18' height='18' className="mr-2"/> 강의관리
      </Link>
      <Link href="/" className="flex text-[16px] text-white items-center pl-5 py-5 hover:bg-primary">
        <ClipboardDocumentListIcon width='18' height='18' className="mr-2"/> 게시판
      </Link>
      <Link href="/" className="flex text-[16px] text-white items-center pl-5 py-5 hover:bg-primary">
        <PresentationChartBarIcon width='18' height='18' className="mr-2"/> 역학조사보고
      </Link>
    </div>
  );
}

export default SideBar;
