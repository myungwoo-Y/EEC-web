'use client';

import { useGetClassesQuery } from '@/services/class';
import { useGetPostsQuery } from '@/services/post';
import {
  BellIcon,
  ChatBubbleBottomCenterIcon,
  DocumentMagnifyingGlassIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import styles from './home.module.scss';
import Carousel from '@/components/Carousel';

export default function Home() {
  const { data: classes } = useGetClassesQuery();
  const { data: notices } = useGetPostsQuery(1);

  return (
    <div className="lg:pt-5">
      <div className="text-3xl font-bold items-center px-5 hidden lg:flex">
        <HomeIcon width={32} className="mr-2" />홈
      </div>

      <section
        className={classNames(styles.hero, "lg:mt-10 py-14 px-10 flex justify-evenly flex-col lg:flex-row")}
      >
        <div>
          <div className="text-3xl font-bold w-fit">
            역학교육센터는
            <div className="w-full h-3 bg-primary opacity-40 rounded-sm -mt-3"></div>
          </div>
          <p className="mt-10 text-lg text-gray-700">
            가축전염병의 예방 및 확산 방지를 위한 역학조사 업무를 수행하는
            <br />
            역학조사관의 역량 강화, 전문인력 양성을 위한 교육.훈련
            <br />
            프로그램을 관리하는 국내 최초의 가축전염병 역학조사
            <br />
            교육센터입니다
          </p>
          <Link href="/class">
            <button className="flex items-center justify-center py-3 px-8 bg-gradient-to-br from-primary to-third rounded-md text-white mt-10 font-bold">
              수강신청
            </button>
          </Link>
        </div>
        <Carousel />
      </section>
      <section className="px-5 flex flex-col lg:flex-row justify-between gap-16 min-h-[200px]">
        <div className="w-full mt-10">
          <div className="text-2xl font-bold flex items-center justify-between">
            <div className="flex">
              <BellIcon width={28} className="mr-1" />
              공지사항
            </div>
            <Link href="/category/1">
              <PlusCircleIcon
                width={28}
                className="hover:bg-primary hover:text-white rounded-full"
              />
            </Link>
          </div>
          <ul className="mt-5">
            {notices &&
              notices.slice(0, 5).map((notice) => (
                <Link href={`/post/${notice.postId}`} key={notice.postId}>
                  <li className="mt-1 group">
                    <span className="inline-block w-60 lg:w-96 h-6 overflow-hidden whitespace-nowrap text-ellipsis group-hover:underline">
                      {notice.title}
                    </span>
                    <span className="float-right text-gray-400 group-hover:underline">
                      {dayjs(notice.createDateTime).format('YYYY.MM.DD')}
                    </span>
                  </li>
                </Link>
              ))}
          </ul>
        </div>
        <div className="w-full mt-10">
          <div className="text-2xl font-bold flex items-center justify-between">
            <div className="flex">
              <DocumentMagnifyingGlassIcon width={28} className="mr-1" />
              수강목록
            </div>
            <Link href="/class">
              <PlusCircleIcon
                width={28}
                className="hover:bg-primary hover:text-white rounded-full"
              />
            </Link>
          </div>
          <ul className="mt-5">
            {classes?.map((data) => (
              <Link key={data.classId} href={`/class`}>
                <li className="mt-1 group">
                  <span className="inline-block w-60 lg:w-96 h-6 overflow-hidden whitespace-nowrap text-ellipsis group-hover:underline">
                    {data.title}
                  </span>
                  <span className="float-right text-gray-400 group-hover:underline">
                    {dayjs(data.registerStart).format('YYYY.MM.DD')}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-gray-100 w-full py-16 p-44 mt-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-4 w-full justify-between items-center">
          <Link href="https://www.qia.go.kr/listindexWebAction.do" className="text-center group">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-third group-hover:text-white">
              <DocumentMagnifyingGlassIcon
                width="72"
                height="72"
                className=""
              />
            </div>
            <p className="text-xl font-bold mt-3 group-hover:underline">
              검역본부 바로가기
            </p>
          </Link>
          <Link href="/category/1" className="text-center group">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-third group-hover:text-white">
              <BellIcon width="72" height="72" className="" />
            </div>
            <p className="text-xl font-bold mt-3 group-hover:underline">
              공지사항
            </p>
          </Link>
          <Link href="/category/6" className="text-center group">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-third group-hover:text-white">
              <ChatBubbleBottomCenterIcon width="72" height="72" />
            </div>
            <p className="text-xl font-bold mt-3 group-hover:underline">
              설문조사
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
