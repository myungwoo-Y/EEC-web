import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex w-full h-full pt-32 pl-10">
      <div className="flex-1">
        <Image
          src="https://nowzone.b-cdn.net/eec/main.png"
          alt="main img"
          width={400}
          height={400}
        />
      </div>
      <div className="flex-1">
        <p className="text-2xl font-bold">역학교육센터는?</p>
        <p className="mt-5">
          가축전염병의 예방 및 확산 방지를 위한 역학조사 업무를 수행하는 <br />
          역학조사관의 역량 강화, 전문인력 양성을 위한 교육.훈련
          <br />
          프로그램을 관리하는 국내 최초의 가축전염병 역학조사
          <br />
          교육센터입니다
        </p>
      </div>
      <div></div>
    </div>
  );
}
