import React from "react";

const OfferingListSkeleton: React.FC = () => {
  const boxs = [0, 0, 0, 0];
  return (
    <div className="w-full py-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
      {boxs.map((_, idx) => (
        <Course key={`course-${idx}`} idx={idx + 2} />
      ))}
    </div>
  );
};

export default OfferingListSkeleton;

const Course: React.FC<{ idx: number }> = ({ idx }) => {
  return (
    <div
      className="w-full flex flex-col bg-lightgray rounded-lg animate-pulse"
      style={{ animationDelay: idx * 0.3 + "s", opacity: 0.5 + 1 / idx }}
    >
      <div className="w-full aspect-video flex-none bg-gray122 rounded-lg" />
      <div className="h-12 w-full px-1 my-2 bg-gray122 rounded-lg"></div>
      <button className="w-full py-2 mb-1 bg-gray154 text-gray154 rounded-lg">
        강의 수정
      </button>
      <button className="w-full py-2 bg-gray175 text-gray175 rounded-lg">
        메인 이동
      </button>
    </div>
  );
};
