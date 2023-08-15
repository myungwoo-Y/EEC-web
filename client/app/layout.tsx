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
            <SideBar />
            <div className="bg-[#EDEFF3] w-full flex flex-col lg:pb-6">
              <Nav />
              <div className="bg-white lg:mx-6 rounded-sm h-full">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
