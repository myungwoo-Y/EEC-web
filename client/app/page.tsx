import SideBar from '@/components/SideBar'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex">
      <SideBar />
      <div>
        <div className="flex">
          <div><i />회원가입</div>
          <div><i />로그인</div>
        </div>
        <div>
          <div className="relative w-32 h-32">
            <Image 
              src="https://nowzone.b-cdn.net/eec/main.png"
              alt="main img"
              fill
            />
          </div>
          <div>
            <h1>역학교육센터는?</h1>
            <p>
              가축전염병의 예방 및 확산 방지를 위한 역학조사 업무를 수행하는 <br />
              역학조사관의 역량 강화, 전문인력 양성을 위한 교육.훈련<br />
              프로그램을 관리하는 국내 최초의 가축전염병 역학조사<br />
              교육센터입니다
            </p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
  )
}
