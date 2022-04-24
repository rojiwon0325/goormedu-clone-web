import React from "react";

const Footer: React.FC<{
  courseId: number;
  lectureId: number;
  courseTitle: string;
}> = ({ courseId, lectureId, courseTitle }) => {
  return (
    <div className="h-11 w-full px-2 bg-lightindigo flex items-center justify-between flex-none absolute bottom-0">
      <div className="w-1/2 max-w-sm px-2 flex-center justify-start">
        <div className="whitespace-nowrap text-opacity-50 text-white text-sm overflow-hidden">
          {courseTitle}
        </div>
      </div>
      <div className="w-1/2 max-w-sm px-2 flex-center justify-end">
        <button className="h-7 px-4 bg-lightindigo border-lightgray border text-lightgray font-NanumSquareRoundBold text-sm rounded-lg">
          수강 완료
        </button>
      </div>
    </div>
  );
};

export default Footer;

/**
 * 코스명 표시
 * recoil을 활용해 complete버튼 만들기 -> CR 생성 + 다음강의 이동
 */
