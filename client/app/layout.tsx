import './globals.css';
import SideBar from '@/components/SideBar';
import Nav from '@/components/Nav';
import { Providers } from '@/redux/provider';

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
      <body suppressHydrationWarning={true}>
        <Providers>
          <div className="flex">
            <SideBar />
            <div className="bg-[#EDEFF3] w-full flex flex-col pb-6">
              <Nav />
              <div className="bg-white mx-6 rounded-sm h-full">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
