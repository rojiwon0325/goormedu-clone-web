import { Common } from "components";
import { ICategory } from "interfaces/category";
import React, { Suspense, useEffect, useState } from "react";
import { useCategories } from "states/server/category";
import { useCourse } from "states/server/course";
import { useTeacherRecord, useUser } from "states/server/user";

const CourseDetail: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data: courseData } = useCourse(courseId);
  if (courseData?.data.ok) {
    return (
      <div className="w-full md:p-10 border-gray190 md:border-t">
        <div className="w-full bg-lightgray border-gray190 md:border md:border-t-0">
          <div className="course-info-box">
            <Common.SVG name="cap" className="h-5 w-5 flex-none" />
            <div className="hidden sm:block flex-none pl-3 pr-5 font-NanumSquareRoundBold">
              난이도
            </div>
            <div className="px-3">{courseData.data.result.level}</div>
          </div>
          <div className="course-info-box">
            <Common.SVG name="document" className="h-5 w-5 flex-none" />
            <div className="hidden sm:block flex-none pl-3 font-NanumSquareRoundBold">
              강의 설명
            </div>
            <div className="px-3">{courseData.data.result.description}</div>
          </div>
          <div className="course-info-box">
            <Common.SVG name="square-four" className="h-5 w-5 flex-none" />
            <div className="hidden sm:block flex-none pl-3 pr-2 font-NanumSquareRoundBold">
              카테고리
            </div>
            <Suspense>
              <Category categoryId={courseData.data.result.category_id} />
            </Suspense>
          </div>
          <div className="course-info-box">
            <Common.SVG name="person-black" className="h-5 w-5 flex-none" />
            <div className="hidden sm:block flex-none pl-3 pr-1 font-NanumSquareRoundBold">
              교육자 정보
            </div>
            <Suspense>
              <Teacher teacherId={courseData.data.result.teacher_id} />
            </Suspense>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default CourseDetail;

const Category: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const { data } = useCategories();
  const [category, setCategory] = useState<ICategory>();
  useEffect(() => {
    if (data?.data.ok) {
      setCategory(data.data.result.find((item) => item.id === categoryId));
    }
  }, [data, setCategory, categoryId]);

  if (data?.data.ok) {
    return <div className="px-3">{category?.name}</div>;
  } else {
    return null;
  }
};

const Teacher: React.FC<{ teacherId: number }> = ({ teacherId }) => {
  const { data: userData } = useUser(teacherId);
  const { data: teacherData } = useTeacherRecord(teacherId);
  if (userData?.data.ok && teacherData?.data.ok) {
    return (
      <div className="px-4 flex flex-col">
        <div className="font-NanumSquareRoundBold">
          교육자명 <span className="px-4">{userData.data.result.username}</span>
        </div>
        <div className="pt-1 font-NanumSquareRoundBold">
          전문분야
          <span className="px-4">{teacherData.data.result.career}</span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
