import React from "react";

const HeaderSkeleton: React.FC = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between animate-pulse">
      <div className="w-full sm:w-64 md:w-80 aspect-video flex-none bg-gray122 rounded-lg" />
      <div className="w-full flex flex-col items-start justify-between py-2 sm:py-0 sm:px-4">
        <div className="h-7 w-full text-lg bg-gray122 rounded-lg" />
        <div className="h-5 w-full" />
        <div className="h-5 w-full bg-gray122 rounded-lg" />
      </div>
      <div className="w-full sm:w-auto flex flex-col flex-none">
        <button className="w-full py-2 px-3 bg-gray122 text-gray122 font-NanumSquareRoundBold rounded-lg">
          강의 듣기
        </button>
      </div>
    </div>
  );
};

export default HeaderSkeleton;
