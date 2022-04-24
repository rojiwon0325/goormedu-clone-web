import { Common } from "components";
import React, { Suspense, useState } from "react";
import SideNav from "./SideNav";

const Header: React.FC<{
  courseId: number;
  courseTitle: string;
  lectureTitle: string;
}> = ({ courseId, courseTitle, lectureTitle }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <SideNav courseId={courseId} courseTitle={courseTitle} open={active} />
      <div className="h-11 w-full px-2 bg-lightindigo flex justify-between flex-none absolute top-0">
        <div className="h-full w-1/2 flex items-center justify-start">
          <button
            className="h-full p-1"
            onClick={() => setActive((pre) => !pre)}
          >
            <Common.SVG name="menu" className="h-full" />
          </button>
          <div className="px-2 text-white font-NanumSquareRoundBold">
            {lectureTitle}
          </div>
        </div>
        <div className="h-full w-1/2 py-2 flex items-center justify-end">
          <Suspense
            fallback={
              <div className="h-full aspect-square rounded-full border-gray175 border-t-gray219 border-4 animate-spin" />
            }
          >
            <Common.Profile />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Header;

/**
 * 강의명 표시
 * 사용자 프로필 버튼 만들기
 * recoil로 nav 펼치기 버튼
 */
