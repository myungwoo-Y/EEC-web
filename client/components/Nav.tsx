import Link from 'next/link';
import React from 'react';

function Nav() {
  return (
    <div className="flex w-full h-14 py-4 flex-row-reverse px-6">
      <div className="hover:text-primary">
        <i />
        <Link href="/login">로그인</Link>
      </div>
      <div className="mr-3">
        <i />
        <Link href="/signup">회원가입</Link>
      </div>
    </div>
  );
}

export default Nav;
