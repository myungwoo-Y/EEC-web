import Input from "@/components/Input";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="pb-24">
        <p className="text-4xl font-bold">Login</p>
        <p className="text-lg mt-2">로그인 정보를 입력해주세요</p>
        <div className="mt-4">
          <p>ID</p>
          <Input 
            type='email'
          />
        </div>
        <div className="mt-2">
          <p>PW</p>
          <Input 
            type='password'
          />
        </div>
      </div>
    </div>
  );
}
