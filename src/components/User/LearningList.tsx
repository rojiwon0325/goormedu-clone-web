import React from "react";
import { Common } from "components";
import { ICourse } from "interfaces/course";
import { useNavigate } from "react-router-dom";
import { useCoursesByLearnings } from "states/server/course";
import { useUser } from "states/server/user";
import LearningListSkeleton from "./LearningListSkeleton";

const LearningList: React.FC = () => {
  const { data } = useCoursesByLearnings();
  if (data?.data.ok) {
    return (
      <div className="w-full flex flex-col animate-fade-in">
        {data.data.result.map((course) => (
          <Course key={`course-${course.id}`} course={course} />
        ))}
      </div>
    );
  } else {
    return <LearningListSkeleton />;
  }
};

export default LearningList;

const Course: React.FC<{ course: ICourse }> = ({
  course: { id, teacher_id, cover_image, title, level },
}) => {
  const navigate = useNavigate();
  const { data: teacherData } = useUser(teacher_id);
  return (
    <div className="w-full pt-4 flex justify-between">
      <div
        className="w-1/2 sm:w-1/3 lg:w-1/4 aspect-video flex-none bg-white bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${cover_image})` }}
      />
      <div className="flex flex-1 px-4">
        <div className="hwfull hidden sm:flex flex-col items-start justify-between">
          <div className="h-12 w-full max-w-sm font-NanumSquareRoundBold overflow-hidden text-ellipsis">
            {title}
          </div>
          <div>
            <div className="mb-0.5 text-sm text-gray86 whitespace-nowrap">
              담당자 {teacherData?.data.ok && teacherData.data.result.username}
            </div>
            <div className="h-6 py-0.5 flex items-center justify-start">
              <div className="h-full w-40 flex items-center justify-start">
                <div className="h-full pr-4 flex-center justify-start">
                  <Common.SVG name="cap" className="h-full aspect-square" />
                  <div className="px-1">{level}</div>
                </div>
                <div className="h-full pr-4 flex-center justify-start">
                  <Common.SVG
                    name="shopping-bag"
                    className="h-full aspect-square"
                  />
                  <div className="px-1">무료</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-none justify-between">
        <div className="h-1/3 pb-1">
          <button
            onClick={() => navigate(`/courses/${id}`)}
            className="h-full w-24 bg-blue text-white font-NanumSquareRoundBold rounded-lg shadow-md"
          >
            강의 듣기
          </button>
        </div>
        <div className="h-1/3 pb-1">
          <button className="h-full w-24 bg-gray229 text-black font-NanumSquareRoundBold rounded-lg shadow-md">
            수강 취소
          </button>
        </div>
        <div className="h-1/3 pb-1">
          <button className="h-full w-24 bg-gray229 text-black font-NanumSquareRoundBold rounded-lg shadow-md">
            Q&A
          </button>
        </div>
      </div>
    </div>
  );
};
