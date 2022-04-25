import { Common } from "components";
import CourseNav from "components/Course/CourseNav";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SideNav: React.FC<{
  courseId: number;
  courseTitle: string;
  open: boolean;
}> = ({ courseId, courseTitle, open }) => {
  const { lecture_id } = useParams();
  const [active, setActive] = useState(!open);

  useEffect(() => {
    setActive(true);
  }, [lecture_id]);

  return (
    <div
      className={`hwfull ${
        active === open ? "visible transition-none" : "invisible"
      } bg-black bg-opacity-50 transition-all duration-150 absolute top-0 left-0 z-20`}
    >
      <div
        className={`h-full flex flex-col bg-lightindigo ${
          active === open ? "w-full sm:w-96" : "w-0"
        } transition-width overflow-hidden`}
      >
        <div className="h-11 w-full px-2 -mb-px flex items-center bg-indigo">
          <button
            className="h-full p-1"
            onClick={() => setActive((pre) => !pre)}
          >
            <Common.SVG name="menu" className="h-full" />
          </button>
          <div className="flex-1 px-2 font-NanumSquareRoundBold whitespace-nowrap text-white overflow-hidden">
            {courseTitle}
          </div>
        </div>
        <Suspense>
          <CourseNav courseId={courseId} darkmode />
          <div className="h-px w-full bg-darkindigo" />
        </Suspense>
      </div>
    </div>
  );
};

export default SideNav;
