import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "./CourseDetail";
import CourseNav from "./CourseNav";
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
      <div className="w-full py-2 md:py-4 flex overflow-x-auto">
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
          코스 소개
        </button>
      </div>
      <div className="w-full flex-center items-start">
        <div className="flex-1">
          <div className="w-full border-gray190 border rounded-lg">
            <div className="p-4 font-NanumSquareRoundBold text-base sm:text-xl">
              {section === "main" ? "교육 과정" : null}
              {section === "detail" ? "코스 소개" : null}
            </div>
            <Suspense>
              {section === "main" ? <CourseNav courseId={courseId} /> : null}
              {section === "detail" ? (
                <CourseDetail courseId={courseId} />
              ) : null}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};
