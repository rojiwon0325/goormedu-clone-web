import { Common } from "components";
import { IChapter, ILecture } from "interfaces/course";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CourseLectureList, LastLecture } from "states/client";
import {
  useChapters,
  useCompletionRecord,
  useLectures,
} from "states/server/course";

const CourseNav: React.FC<{ courseId: number; darkmode?: boolean }> = ({
  courseId,
  darkmode = false,
}) => {
  const { data: chaptersData } = useChapters(courseId);
  const [chapters, setChapters] = useState<IChapter[]>();

  useEffect(() => {
    if (chaptersData?.data.ok && chapters === undefined) {
      setChapters(chaptersData.data.result.sort((a, b) => a.order - b.order));
    }
  }, [chaptersData, chapters]);

  if (chapters) {
    return (
      <div className={`w-full ${darkmode ? "bg-lightindigo" : "bg-lightgray"}`}>
        {chapters.map((chapter, idx) => (
          <Chapter
            key={`chapter-${chapter.id}`}
            chapter={chapter}
            idx={idx}
            darkmode={darkmode}
          />
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default CourseNav;

const Chapter: React.FC<{
  chapter: IChapter;
  idx: number;
  darkmode: boolean;
}> = ({ idx, chapter: { id, title, course_id, order }, darkmode }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen((pre) => !pre)}
        className={`h-14 py-4 px-2 flex items-center overflow-hidden ${
          darkmode ? "border-darkindigo" : "border-gray190"
        } border-t cursor-pointer`}
      >
        <div className="px-2 text-blue font-NanumSquareRoundBold">
          {idx < 10 ? 0 : ""}
          {idx + 1}
        </div>
        <div
          className={`h-full px-2 font-NanumSquareRoundBold text-base overflow-hidden ${
            darkmode ? "text-white" : "text-black"
          }`}
        >
          {title}
        </div>
      </div>
      <div
        className={`w-full ${
          open ? "max-h-screen" : "max-h-0"
        } flex flex-col transition-all overflow-hidden`}
      >
        <Suspense>
          <LecturesWrap
            courseId={course_id}
            chapterId={id}
            chapterOrder={order}
            darkmode={darkmode}
          />
        </Suspense>
      </div>
    </>
  );
};

const LecturesWrap: React.FC<{
  courseId: number;
  chapterId: number;
  chapterOrder: number;
  darkmode: boolean;
}> = ({ courseId, chapterId, chapterOrder, darkmode }) => {
  const { data: lectureData } = useLectures(courseId, chapterId);
  const setCourseLectureList = useSetRecoilState(CourseLectureList);
  const [lastLecture, setLastLecture] = useRecoilState(LastLecture);

  useEffect(() => {
    if (lastLecture && lectureData?.data.ok) {
      const last = lectureData.data.result.find(
        (lecture) => lecture.id === lastLecture.id
      );
      if (last) {
        setLastLecture({ id: last.id, title: last.title });
      }
    }
  }, [lastLecture, lectureData, setLastLecture]);

  useEffect(() => {
    if (lectureData?.data.ok && lectureData.data.result.length > 0) {
      const result: { id: number; order: number }[] = [];
      const newIds: number[] = [];
      for (const lecture of lectureData.data.result) {
        result.push({ id: lecture.id, order: lecture.order * chapterOrder });
        newIds.push(lecture.id);
      }
      setCourseLectureList((prev) => {
        const prelist = (prev[courseId] ?? []).filter(
          (lecture) => !newIds.includes(lecture.id)
        );
        const newlist = [...prelist, ...result].sort(
          (a, b) => a.order - b.order
        ); // 중복 발생을 방지하지만 굉장히 비효율적으로 보임
        return { ...prev, [courseId]: newlist };
      });
    }
  }, [courseId, lectureData, setCourseLectureList, chapterOrder]);

  if (lectureData?.data.ok) {
    return (
      <>
        {lectureData.data.result.map((lecture) => (
          <Lecture
            key={`lecture-${lecture.id}`}
            lecture={lecture}
            darkmode={darkmode}
          />
        ))}
      </>
    );
  } else {
    return null;
  }
};

const Lecture: React.FC<{ lecture: ILecture; darkmode: boolean }> = ({
  lecture: { title, id, course_id },
  darkmode,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`h-14 py-4 px-2 border-gray190 border-t ${
        darkmode
          ? "bg-indigo border-darkindigo hover:bg-darkblue"
          : "bg-gray229 border-gray190 hover:bg-gray219"
      }`}
    >
      <div
        onClick={() => navigate(`/classroom/${course_id}/${id}`)}
        className="hwfull flex cursor-pointer"
      >
        <Suspense
          fallback={
            <Common.SVG
              name="check-circle"
              className={`h-full aspect-square mx-1.5 p-1 ${
                darkmode ? "fill-white" : "fill-black"
              }`}
            />
          }
        >
          <CompletionRecord
            courseId={course_id}
            lectureId={id}
            darkmode={darkmode}
          />
        </Suspense>
        <div
          className={`h-full px-2 font-NanumSquareRoundBold text-base overflow-hidden ${
            darkmode ? "text-white" : "text-black"
          }`}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

const CompletionRecord: React.FC<{
  courseId: number;
  lectureId: number;
  darkmode: boolean;
}> = ({ courseId, lectureId, darkmode }) => {
  const { data } = useCompletionRecord(courseId, lectureId);

  return (
    <Common.SVG
      name="check-circle"
      className={`h-full aspect-square mx-1.5 p-1 ${
        data?.data.ok ? "fill-blue" : darkmode ? "fill-white" : "fill-black"
      }`}
    />
  );
};
