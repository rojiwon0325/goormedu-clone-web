import React from "react";

const CourseListSkeleton = () => {
  const boxs = [0, 0, 0];
  return (
    <div className="w-full py-2 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 animate-fade-in">
      {boxs.map((_, idx) => (
        <Box key={idx} idx={idx + 2} />
      ))}
    </div>
  );
};

export default CourseListSkeleton;

const Box: React.FC<{ idx: number }> = ({ idx }) => (
  <div
    className="w-full flex flex-col animate-pulse bg-lightgray rounded-lg"
    style={{
      animationDuration: "3s",
      animationDelay: idx * 0.2 + "s",
      opacity: 0.5 + 1 / idx,
    }}
  >
    <div className="w-full aspect-video flex-none bg-gray175 rounded-lg" />
    <div className="h-12 w-full my-2 bg-gray203 rounded-lg" />
    <div className="w-full mb-1 text-sm bg-gray219 rounded-lg text-gray219">
      .
    </div>
    <div className="h-7 w-full bg-gray229 rounded-lg" />
  </div>
);
