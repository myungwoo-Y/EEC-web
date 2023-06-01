export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-24">
        <p className="text-4xl font-bold">Login</p>
        <p className="text-xl mt-2">로그인 정보를 입력해주세요</p>
        <div className="mt-4">
          <p>ID</p>
          <input type="email" className="border-[1px] border-gray-300 rounded-sm w-72 py-1 px-2" />
        </div>
        <div className="mt-2">
          <p>PW</p>
          <input type="password" className="border-[1px] border-gray-300 rounded-sm w-72 py-1 px-2" />
        </div>
      </div>
    </div>
  );
}
