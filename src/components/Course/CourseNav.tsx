import { Common } from "components";
import { IChapter, ILecture } from "interfaces/course";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChapters, useLectures } from "states/server/course";

const CourseNav: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data: chaptersData } = useChapters(courseId);
  const [chapters, setChapters] = useState<IChapter[]>();

  useEffect(() => {
    if (chaptersData?.data.ok && chapters === undefined) {
      setChapters(chaptersData.data.result.sort((a, b) => a.order - b.order));
    }
  }, [chaptersData, chapters]);

  if (chapters) {
    return (
      <div className="w-full bg-lightgray">
        {chapters.map((chapter, idx) => (
          <Chapter key={`chapter-${chapter.id}`} chapter={chapter} idx={idx} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default CourseNav;

const Chapter: React.FC<{ chapter: IChapter; idx: number }> = ({
  idx,
  chapter: { id, title, course_id },
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen((pre) => !pre)}
        className="h-14 py-4 px-2 flex items-center overflow-hidden border-gray190 border-t cursor-pointer"
      >
        <div className="px-2 text-blue font-NanumSquareRoundBold">
          {idx < 10 ? 0 : ""}
          {idx + 1}
        </div>
        <div className="h-full px-2 font-NanumSquareRoundBold text-base overflow-hidden">
          {title}
        </div>
      </div>
      <div
        className={`w-full ${
          open ? "max-h-screen" : "max-h-0"
        } flex flex-col transition-all overflow-hidden`}
      >
        <Suspense>
          <LecturesWrap courseId={course_id} chapterId={id} />
        </Suspense>
      </div>
    </>
  );
};

const LecturesWrap: React.FC<{ courseId: number; chapterId: number }> = ({
  courseId,
  chapterId,
}) => {
  const { data: lectureData } = useLectures(courseId, chapterId);
  if (lectureData?.data.ok) {
    return (
      <>
        {lectureData.data.result.map((lecture) => (
          <Lecture key={`lecture-${lecture.id}`} lecture={lecture} />
        ))}
      </>
    );
  } else {
    return null;
  }
};

const Lecture: React.FC<{ lecture: ILecture }> = ({
  lecture: { title, id, course_id },
}) => {
  const navigate = useNavigate();
  return (
    <div className="h-14 py-4 px-2 border-gray190 border-t bg-gray229">
      <div
        onClick={() => navigate(`/classroom/${course_id}/${id}`)}
        className="hwfull flex cursor-pointer"
      >
        <Common.SVG
          name="monitor"
          className="h-full aspect-square mx-1.5 p-1"
        />
        <div className="px-2 font-NanumSquareRoundBold text-base">{title}</div>
      </div>
    </div>
  );
};
