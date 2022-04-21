import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import LearningList from "./LearningList";
import LearningListSkeleton from "./LearningListSkeleton";

const MyLearnings: React.FC = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>수강 목록 | GoormEdu</title>
      </Helmet>
      <div className="pb-1 border-gray86 border-b font-NanumSquareRoundBold text-lg">
        수강 목록
      </div>
      <Suspense fallback={<LearningListSkeleton />}>
        <LearningList />
      </Suspense>
    </div>
  );
};

export default MyLearnings;
