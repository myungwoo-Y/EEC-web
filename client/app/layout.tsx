import './globals.css';
import SideBar from '@/components/SideBar';
import Nav from '@/components/nav';
import { Providers } from '@/redux/provider';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../public/font/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/font/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/font/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata = {
  title: '역학교육센터',
  description: '농림축산검역본부 역학교육센터',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning={true} className={pretendard.className}>
        <Providers>
          <div className="flex">
            <div className="hidden lg:block">
              <SideBar className="lg:fixed" />
            </div>
            <div className="lg:bg-[#EDEFF3] w-full flex flex-col lg:pb-6 h-screen overflow-y-auto lg:pl-[200px]">
              <Nav />
              <div className="bg-white lg:mx-6 rounded-sm lg:h-full lg:overflow-y-auto">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
