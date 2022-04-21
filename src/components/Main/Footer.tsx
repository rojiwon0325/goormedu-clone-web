import React from "react";

const Footer = () => {
  return (
    <footer className="w-full flex-center border-gray86 border-t">
      <div className="max-w py-6">
        <div className="flex justify-start md:flex-row">
          <div className=" md:pr-4 text-4xl md:pb-6 whitespace-nowrap font-NanumSquareRoundBold">
            goorm
          </div>
          <div className="md:flex flex-col text-gray86 overflow-hidden whitespace-nowrap hidden">
            <span>English | 한국어</span>
            <span>
              상호 : (주)구름 대표 : 류성태 개인정보보호책임자 : 김현화
            </span>
            <span>주소 : 경기 성남시 분당구 판교로 242 PDC A동 602호</span>
            <span>사업자등록번호 : 124-87-39200</span>
            <span>통신판매업 신고 번호 : 제2019-성남분당B-0224호</span>
            <span>TEL : 031-600-8586 Email : contact@goorm.io</span>
          </div>
          <div className="px-3 text-slate-500 overflow-hidden whitespace-nowrap md:hidden">
            <div>TEL : 031-600-8586</div>
            <div>Email : contact@goorm.io</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
