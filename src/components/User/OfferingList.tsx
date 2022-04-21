import { ICourse } from "interfaces/course";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCoursesByOfferings } from "states/server/course";
import OfferingListSkeleton from "./OfferingListSkeleton";

const OfferingList: React.FC = () => {
  const { data } = useCoursesByOfferings();
  if (data?.data.ok) {
    return (
      <div className="w-full py-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
        {data.data.result.map((course) => (
          <Course key={`course-${course.id}`} course={course} />
        ))}
      </div>
    );
  } else {
    return <OfferingListSkeleton />;
  }
};

export default OfferingList;

const Course: React.FC<{ course: ICourse }> = ({
  course: { id, cover_image, title },
}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col bg-lightgray rounded-lg">
      <div
        className="w-full aspect-video flex-none bg-white bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${cover_image})` }}
      />
      <div className="h-12 w-full px-1 my-2 font-semibold overflow-hidden">
        {title}
      </div>
      <button
        onClick={() => navigate(`/teacher/${id}`)}
        className="w-full py-2 mb-1 bg-blue text-white font-NanumSquareRoundBold rounded-lg shadow-md"
      >
        강의 수정
      </button>
      <button
        onClick={() => navigate(`/courses/${id}`)}
        className="w-full py-2 bg-gray229 text-black font-NanumSquareRoundBold rounded-lg shadow-md"
      >
        메인 이동
      </button>
    </div>
  );
};
