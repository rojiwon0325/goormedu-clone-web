import { Common } from "components";
import { IChapter, ILecture } from "interfaces/course";
import { MoveItemFn } from "interfaces/dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  useChapterDelete,
  useChapters,
  useChapterUpdate,
  useLectureCreate,
  useLectureDelete,
  useLectures,
} from "states/server/course";

const ChapterDashBoard: React.FC = () => {
  const { course_id, chapter_id } = useParams();
  if (chapter_id && course_id) {
    return (
      <Content
        courseId={parseInt(course_id)}
        chapterId={parseInt(chapter_id)}
      />
    );
  } else {
    return null;
  }
};

export default ChapterDashBoard;
// 챕터 삭제, 새 강의 추가, 삭제 기능을 여기에 추가
// 강의 순서도 여기서 변경

const Content: React.FC<{ courseId: number; chapterId: number }> = ({
  courseId,
  chapterId,
}) => {
  const { data: chaptersData } = useChapters(courseId);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateChapter, isLoading: updateLoading } = useChapterUpdate(
    courseId,
    chapterId
  );
  const { mutate: deleteChapter, isLoading: deleteLoading } = useChapterDelete(
    courseId,
    chapterId
  );

  const onUpdate = () => {
    if (inputRef.current?.value) {
      updateChapter({ title: inputRef.current.value });
    } else {
      alert("챕터 제목이 필요합니다.");
    }
  };
  const onDelete = () => deleteChapter();

  const [chapter, setChapter] = useState<IChapter>({
    id: chapterId,
    course_id: courseId,
    teacher_id: 0,
    title: "",
    order: 0,
  });

  useEffect(() => {
    if (chaptersData?.data.ok) {
      const chap = chaptersData.data.result.find((val) => val.id === chapterId);
      if (chap) {
        setChapter(chap);
      }
    }
  }, [chaptersData, chapterId]);

  useEffect(() => {
    if (inputRef.current && chapter?.title) {
      inputRef.current.value = chapter.title;
    }
  }, [chapter]);

  return (
    <div className="w-full min-w-max px-4">
      <div className="hwfull p-4 flex flex-col border-gray122 border-4 rounded-l">
        <div className="w-full py-2 px-2 bg-gray229 rounded-lg">
          <input
            ref={inputRef}
            disabled={updateLoading}
            placeholder="챕터 제목"
            className="hwfull bg-transparent"
          />
        </div>
        <div className="w-full py-4 flex">
          <button
            disabled={updateLoading || deleteLoading}
            className="flex-1 py-2 px-4 bg-blue text-white font-NanumSquareRoundBold rounded-lg shadow-md"
            onClick={onUpdate}
          >
            수정
          </button>
          <div className="w-4" />
          <button
            disabled={updateLoading || deleteLoading}
            className="flex-1 py-2 px-4 bg-gray229 text-black font-NanumSquareRoundBold rounded-lg shadow-md"
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
        <CreateLecture courseId={courseId} chapterId={chapterId} />
        <Suspense>
          <LecturesPart courseId={courseId} chapterId={chapterId} />
        </Suspense>
      </div>
    </div>
  );
};

const CreateLecture: React.FC<{ courseId: number; chapterId: number }> = ({
  courseId,
  chapterId,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = useLectureCreate(courseId);

  const onClick = () => {
    if (inputRef.current?.value) {
      const data = new FormData();
      data.append("title", inputRef.current.value);
      data.append("chapter_id", chapterId + "");
      mutate(data);
      inputRef.current.value = "";
    } else {
      alert("제목이 필요합니다.");
    }
  };

  return (
    <div className="w-full py-2 mb-4 flex bg-gray229 rounded-lg">
      <div className="h-full px-2 flex-center justify-start flex-1">
        <input
          ref={inputRef}
          placeholder="새 강의 생성"
          disabled={isLoading}
          className="hwfull bg-transparent placeholder:text-gray175"
        />
      </div>
      <button
        onClick={onClick}
        disabled={isLoading}
        className="p-px aspect-square flex-center bg-gray203 hover:bg-gray190 rounded-lg"
      >
        +
      </button>
    </div>
  );
};

const LecturesPart: React.FC<{ courseId: number; chapterId: number }> = ({
  courseId,
  chapterId,
}) => {
  const { data } = useLectures(courseId, chapterId);
  const [lectures, setLectures] = useState<ILecture[]>([]);

  const moveLecture: MoveItemFn = useCallback(
    (dragIndex, hoverIndex) =>
      setLectures((prev) => {
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

  const renderLecture = useCallback(
    (lecture: ILecture, index: number) => (
      <Common.DnDItem
        key={`lecture-option-${lecture.id}`}
        id={lecture.id}
        hoverIndex={index}
        moveItem={moveLecture}
        type="Chapter"
      >
        <Lecture lecture={lecture} index={index} />
      </Common.DnDItem>
    ),
    [moveLecture]
  );

  useEffect(() => {
    if (data?.data.ok) {
      const newlist = [...data.data.result];
      setLectures(newlist.sort((a, b) => a.order - b.order));
    }
  }, [data]);

  return (
    <DndProvider backend={HTML5Backend}>
      {lectures.map((lecture, i) => renderLecture(lecture, i))}
    </DndProvider>
  );
};

const Lecture: React.FC<{ lecture: ILecture; index: number }> = ({
  lecture: { title, course_id, id },
  index,
}) => {
  const { mutate, isLoading } = useLectureDelete(course_id, id);

  return (
    <div className="w-full p-1 flex bg-lightgray hover:bg-skyblue">
      <div className="pr-2">{index < 9 ? "0" + (index + 1) : index + 1}</div>
      <div className="flex-1 text-left text-ellipsis whitespace-nowrap overflow-hidden">
        {title}
      </div>
      <button
        disabled={isLoading}
        onClick={() => mutate()}
        className="h-6 w-6 bg-gray229 hover:bg-gray190"
      >
        -
      </button>
    </div>
  );
};
