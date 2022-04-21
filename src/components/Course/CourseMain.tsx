import React from "react";
import CourseNav from "./CourseNav";

const CourseMain: React.FC<{ courseId: number }> = ({ courseId }) => {
  return (
    <div className="w-full border-gray190 border rounded-lg">
      <div className="p-4 font-NanumSquareRoundBold text-base sm:text-xl">
        교육 과정
      </div>
      <CourseNav courseId={courseId} />
    </div>
  );
};

export default CourseMain;
