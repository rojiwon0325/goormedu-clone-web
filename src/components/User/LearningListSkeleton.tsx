import React from "react";

const LearningListSkeleton = () => {
  const boxs = [0, 0, 0, 0];
  return (
    <div className="w-full flex flex-col animate-fade-in">
      {boxs.map((_, idx) => (
        <Course key={`course-${idx}`} idx={idx + 2} />
      ))}
    </div>
  );
};

export default LearningListSkeleton;

const Course: React.FC<{ idx: number }> = ({ idx }) => (
  <div
    className="w-full pt-4 flex justify-between animate-pulse"
    style={{
      animationDelay: idx * 0.3 + "s",
      animationDuration: "3s",
      opacity: 0.5 + 1 / idx,
    }}
  >
    <div className="w-1/2 sm:w-1/3 lg:w-1/4 aspect-video flex-none bg-gray122 rounded-lg" />
    <div className="flex flex-1 px-4">
      <div className="hwfull hidden sm:flex flex-col items-start justify-between">
        <div className="h-12 w-full max-w-sm overflow-hidden bg-gray122 rounded-lg" />
        <div>
          <div className="w-20 text-sm text-gray154 bg-gray122 rounded-lg">
            .
          </div>
          <div className="h-6 py-0.5 flex items-center justify-start">
            <div className="h-full w-40 flex items-center bg-gray122 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col flex-none justify-between">
      <div className="h-1/3 pb-1">
        <div className="h-full w-24 bg-gray122 rounded-lg" />
      </div>
      <div className="h-1/3 pb-1">
        <div className="h-full w-24 bg-gray122 rounded-lg" />
      </div>
      <div className="h-1/3 pb-1">
        <div className="h-full w-24 bg-gray122 rounded-lg" />
      </div>
    </div>
  </div>
);
