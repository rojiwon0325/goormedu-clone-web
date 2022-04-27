import { Common } from "components";
import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import SideNav from "./SideNav";

const Header: React.FC<{
  courseId: number;
  courseTitle: string;
  lectureTitle: string;
}> = ({ courseId, courseTitle, lectureTitle }) => {
  const navigate = useNavigate();
  const { lecture_id } = useParams();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(false);
  }, [lecture_id]);

  return (
    <>
      <Helmet>
        <title>
          {lectureTitle} | {courseTitle}
        </title>
      </Helmet>
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
          <div
            onClick={() => navigate(`/courses/${courseId}`)}
            className="px-2 text-white font-NanumSquareRoundBold cursor-pointer"
          >
            메인 이동
          </div>
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
