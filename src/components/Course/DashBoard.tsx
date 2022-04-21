import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "./CourseDetail";
import CourseMain from "./CourseMain";
import Header from "./Header";
import HeaderSkeleton from "./HeaderSkeleton";

const DashBoard: React.FC = () => {
  const { course_id } = useParams();
  if (course_id) {
    const courseId = parseInt(course_id);
    return (
      <div className="max-w py-4">
        <Suspense fallback={<HeaderSkeleton />}>
          <Header courseId={courseId} />
        </Suspense>
        <ContentWrap courseId={courseId} />
      </div>
    );
  } else {
    return null;
  }
};

export default DashBoard;

type ICourseSection = "main" | "detail";

const ContentWrap: React.FC<{ courseId: number }> = ({ courseId }) => {
  const [section, setSection] = useState<ICourseSection>("main");
  return (
    <>
      <div className="w-full py-2 md:py-4 flex overflow-x-scroll">
        <button
          onClick={() => setSection("main")}
          className="h-11 w-40 mr-2 flex-none border-blue border bg-lightgray rounded-lg shadow-md font-NanumSquareRoundBold"
        >
          교육 과정
        </button>
        <button
          onClick={() => setSection("detail")}
          className="h-11 w-40 mr-2 flex-none border-blue border bg-lightgray rounded-lg shadow-md font-NanumSquareRoundBold"
        >
          강의 소개
        </button>
      </div>
      <div className="w-full flex-center items-start">
        <div className="flex-1">
          <Suspense>
            {section === "main" ? <CourseMain courseId={courseId} /> : null}
            {section === "detail" ? <CourseDetail courseId={courseId} /> : null}
          </Suspense>
        </div>
      </div>
    </>
  );
};
