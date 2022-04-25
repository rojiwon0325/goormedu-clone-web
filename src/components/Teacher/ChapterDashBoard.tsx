import { IChapter } from "interfaces/course";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useChapterDelete,
  useChapters,
  useChapterUpdate,
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
        <div>
          강의 순서 변경, 추가, 삭제 작업 영역, 새강의 추가는 별도 영역이 필요
        </div>
      </div>
    </div>
  );
};
