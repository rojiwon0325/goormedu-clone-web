import { Common } from "components";
import { IChapter, ILecture } from "interfaces/course";
import React, { Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { CourseLectureList } from "states/client";
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
  const { data: lecturesData } = useLectures(courseId, chapterId);
  const [lectures, setLectures] = useState<ILecture[]>([]);
  const setCourseLectureList = useSetRecoilState(CourseLectureList);

  useEffect(() => {
    if (lecturesData?.data.ok) {
      const lecturelist = lecturesData.data.result;
      setLectures(lecturelist);
      const result = lecturelist.map(({ id, order }) => ({
        id,
        order: order * chapterOrder,
      }));
      const newIds = lecturelist.map(({ id }) => id);
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
  }, [chapterOrder, courseId, lecturesData, setCourseLectureList]);

  return (
    <>
      {lectures.map((lecture) => (
        <Lecture
          key={`lecture-${lecture.id}`}
          lecture={lecture}
          darkmode={darkmode}
        />
      ))}
    </>
  );
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
      }  cursor-pointer`}
      onClick={() => navigate(`/classroom/${course_id}/${id}`)}
    >
      <div className="hwfull flex">
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
