import React from 'react';
import checkboxStyles from './Checkbox.module.scss';

type AgreementProps = {
  isChecked: boolean;
  onClick: () => void;
  className?: string;
};

function Agreement({ isChecked = false,  onClick, className = '' }: AgreementProps) {
  return (
    <div>
      <div
        className={`h-40 overflow-y-scroll border-2 border-gray-200 ${className}`}
      >
        <div className="flex flex-col gap-6 p-3">
          <p className="font-bold">개인정보수집 및 이용 안내</p>

          <p className="">
            1. 정보 수집․이용 기관명 : 농림축산검역본부, 역학조사관 교육․훈련
            사업 위탁관리 기관
          </p>

          <div className="font-semibold">
            <p>2. 정보 수집․이용 범위와 목적</p>
            <p>
              - 아이디, 비밀번호, 성명, 생년월일(교육생에 한함), 연락처,
              소속기관, 직급, 교육기수(교육생에 한함)
            </p>
          </div>

          <div className="font-semibold">
            <p>3. 사용목적</p>
            <p>- 역학조사관 교육․훈련 교육생 정보 처리</p>
            <p>- 교육정보 서비스 제공, 회원 개인 식별</p>
          </div>

          <div>
            <p>4. 보유 및 이용기간</p>
            <p>- 공무원 : 준영구</p>
            <p>- 비공무원 : 회원탈퇴시</p>
          </div>

          <div>
            <p>5. 동의 거부 및 불이익</p>
            <p>
              - 수집항목 이용 동의 거부시 역학조사관 교육센터에서 제공하는
              서비스를 받으실 수 없으며, 교육 이수 실적이 누락될 수 있음
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 cursor-pointer" onClick={onClick}>
        <input className={`w-4 ${checkboxStyles.rectangle}`} type="checkbox" readOnly checked={isChecked}></input>
        <p>개인정보 수집에 동의합니다.</p>
      </div>
    </div>
  );
}

export default Agreement;
