import React, { Suspense } from "react";
import { useRecoilValue } from "recoil";
import { SelectedCategory } from "states/client";
import CategoryNav from "./CategoryNav";
import CourseList from "./CourseList";
import { useAllCourses, useCoursesByCategory } from "states/server/course";
import CourseListSkeleton from "./CourseListSkeleton";
import { Helmet } from "react-helmet-async";

const CategoryContent = () => {
  const selected = useRecoilValue(SelectedCategory);

  return (
    <div className="w-full md:pl-4">
      <Helmet>
        <title>Home | GroomEdu</title>
      </Helmet>
      <div className="border-gray86 border-b font-NanumSquareRoundBold">
        {selected.name}
      </div>
      <div className="w-full">
        <CategoryNav top />
        <Suspense fallback={<CourseListSkeleton />}>
          <div className="w-full animate-fade-in">
            <ContentWrap categoryId={selected.id} />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryContent;

const ContentWrap: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const { data: allData } = useAllCourses(categoryId);
  const { data: categoriedData } = useCoursesByCategory(categoryId);
  if (categoryId === 0 && allData?.data.ok) {
    return <CourseList courses={allData.data.result} />;
  } else if (categoryId !== 0 && categoriedData?.data.ok) {
    return <CourseList courses={categoriedData.data.result} />;
  }
  return null; // suspense
};
