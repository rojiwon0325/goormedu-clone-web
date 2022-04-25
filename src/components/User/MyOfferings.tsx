import React, { Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import OfferingList from "./OfferingList";
import OfferingListSkeleton from "./OfferingListSkeleton";

const MyOfferings: React.FC = () => {
  return (
    <div className="w-full">
      <Helmet>
        <title>담당 코스 | GoormEdu</title>
      </Helmet>
      <div className="pb-1 border-gray86 border-b font-NanumSquareRoundBold text-lg">
        담당 코스
      </div>
      <Link
        to="/teacher/create"
        className="py-2 px-3 mt-2 bg-blue text-white rounded-lg"
      >
        새 코스 추가
      </Link>
      <Suspense fallback={<OfferingListSkeleton />}>
        <OfferingList />
      </Suspense>
    </div>
  );
};

export default MyOfferings;
