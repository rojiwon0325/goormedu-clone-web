import { Common } from "components";
import { IChapter, ILecture } from "interfaces/course";
import { MoveItemFn } from "interfaces/dnd";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useChapters, useLectures } from "states/server/course";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const UpdateNav: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data: chaptersData } = useChapters(courseId);
  const [chapters, setChapters] = useState<IChapter[]>([]);

  const moveChapter: MoveItemFn = useCallback(
    (dragIndex, hoverIndex) =>
      setChapters((prev) => {
        if (prev.length < 2) return [...prev];
        const next = [...prev];
        const drag = prev[dragIndex];
        const hover = prev[hoverIndex];
        next[dragIndex] = hover;
        next[hoverIndex] = drag;
        return next;
      }),
    []
  );

  const renderChapter = useCallback(
    (chapter: IChapter, index: number) => (
      <Common.DnDItem
        key={`chapter-${chapter.id}`}
        id={chapter.id}
        hoverIndex={index}
        moveItem={moveChapter}
        type="Chapter"
      >
        <Chapter chapter={chapter} index={index} />
      </Common.DnDItem>
    ),
    [moveChapter]
  );

  useEffect(() => {
    if (chaptersData?.data.ok) {
      const newChapters = [...chaptersData.data.result];
      newChapters.sort((a, b) => a.order - b.order);
      setChapters(newChapters);
    }
  }, [chaptersData]);

  return (
    <>
      <div className="h-96 w-full mb-2 overflow-scroll border-gray219 border">
        <DndProvider backend={HTML5Backend}>
          {chapters.map((chapter, i) => renderChapter(chapter, i))}
        </DndProvider>
      </div>
      <button className="py-2 px-3 bg-gray190 hover:bg-gray219 rounded-lg">
        챕터 순서 저장
      </button>
    </>
  );
};

export default UpdateNav;

const Chapter: React.FC<{ chapter: IChapter; index: number }> = ({
  chapter: { title, course_id, id },
  index,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  return (
    <div className="w-full border-gray190 border-b">
      <div className="w-full p-1 flex hover:bg-skyblue">
        <div className="pr-2">{index < 9 ? "0" + (index + 1) : index + 1}</div>
        <div
          onClick={() => {
            navigate(`/teacher/${course_id}/chapters/${id}`);
          }}
          className="flex-1 text-left text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {title}
        </div>
        <div
          onClick={() => setActive((pre) => !pre)}
          className="h-6 w-6 flex-center text-white bg-gray190 rounded-lg"
        >
          ⇕
        </div>
      </div>
      <div className={`${active ? "h-auto" : "h-0"} w-full overflow-hidden`}>
        <Suspense>
          <LectureWrap courseId={course_id} chapterId={id} />
        </Suspense>
      </div>
    </div>
  );
};

const LectureWrap: React.FC<{ courseId: number; chapterId: number }> = ({
  courseId,
  chapterId,
}) => {
  const { data } = useLectures(courseId, chapterId);
  if (data?.data.ok) {
    return (
      <>
        {data.data.result.map((lecture) => (
          <Lecture lecture={lecture} key={`lecture-${lecture.id}`} />
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
    <div
      onClick={() => navigate(`/teacher/${course_id}/lectures/${id}`)}
      className="py-1 px-2 border-gray190 border-t bg-gray229 hover:bg-gray219"
    >
      {title}
    </div>
  );
};
