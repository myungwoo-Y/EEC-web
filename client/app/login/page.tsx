import Input from "@/components/Input";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-24">
        <p className="text-3xl font-semibold">Welcome back</p>
        <p className="text-lg mt-2 text-gray-400">로그인 정보를 입력해주세요</p>
        <div className="mt-4">
          <p>ID</p>
          <Input 
            type='email'
            className='w-96'
          />
        </div>
        <div className="mt-2">
          <p>PW</p>
          <Input 
            type='password'
            className='w-96'
          />
        </div>
        <button className="w-full bg-[#2362BA] mt-6 rounded-md flex items-center justify-center text-white text-lg py-2">
          Login
        </button>
      </div>
    </div>
  );
}
