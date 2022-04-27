import { Common } from "components";
import { ICourse } from "interfaces/course";
import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "states/server/user";

const CourseList: React.FC<{ courses: ICourse[] }> = ({ courses }) => {
  return (
    <div className="w-full py-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
      {courses.map((course) => (
        <Course course={course} key={`course-${course.id}`} />
      ))}
    </div>
  );
};

export default CourseList;

const Course: React.FC<{ course: ICourse }> = ({
  course: { id, cover_image, title, teacher_id, level },
}) => {
  const { data: teacherData } = useUser(teacher_id);

  return (
    <Link
      to={`/courses/${id}`}
      className="w-full flex flex-col bg-lightgray rounded-lg"
    >
      <div
        className="w-full aspect-video flex-none bg-gray122 bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${cover_image})` }}
      />
      <div className="h-12 w-full px-1 my-2 overflow-hidden text-base font-semibold">
        {title}
      </div>
      <div className="w-full px-1 mb-1 whitespace-nowrap overflow-hidden text-sm text-gray86">
        담당자
        <span className="px-1 font-NanumSquareRoundBold">
          {teacherData?.data.ok && teacherData.data.result.username}
        </span>
      </div>
      <div className="h-7 w-full p-1 flex-center justify-between">
        <div className="h-full flex-center">
          <Common.SVG name="cap" className="h-full aspect-square" />
          <div className="px-1 text-sm text-black">{level}</div>
        </div>
        <div className="h-full flex-center">
          <Common.SVG name="shopping-bag" className="h-full aspect-square" />
          <div className="px-1 text-sm text-black">무료</div>
        </div>
      </div>
    </Link>
  );
};
