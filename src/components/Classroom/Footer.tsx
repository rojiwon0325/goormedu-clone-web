import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CourseLectureList } from "states/client";
import { useComplete } from "states/server/course";

const Footer: React.FC<{
  courseId: number;
  lectureId: number;
  courseTitle: string;
}> = ({ courseId, lectureId, courseTitle }) => {
  const navigate = useNavigate();
  const courseLectureList = useRecoilValue(CourseLectureList);
  const [nowSeq, setSeq] = useState(0);
  const [total, setTotal] = useState(0);
  const [prevLectureId, setPrevLecture] = useState(0);
  const [nextLectureId, setNextLecture] = useState(0);
  const { mutate, isLoading } = useComplete(courseId, lectureId);

  useEffect(() => {
    const lectureList = courseLectureList[courseId];
    if (lectureList) {
      const index = lectureList.findIndex(
        (lecture) => lecture.id === lectureId
      );
      setTotal(lectureList.length);
      if (index > -1) {
        setSeq(index + 1);
      }
      if (index > 0) {
        setPrevLecture(lectureList[index - 1].id);
      }
      if (index + 1 < lectureList.length) {
        setNextLecture(lectureList[index + 1].id);
      }
    }
  }, [courseId, lectureId, courseLectureList]);

  return (
    <div className="h-11 w-full px-2 flex-center justify-between flex-none bg-lightindigo absolute bottom-0">
      <div className="w-0 sm:w-auto sm:flex-1 sm:px-2 flex-center justify-start overflow-hidden">
        <div className="whitespace-nowrap text-opacity-50 text-white text-sm overflow-hidden">
          {courseTitle}
        </div>
      </div>
      <div className="h-full flex-1 flex-center sm:flex-none">
        <button
          className="py-1 px-2 border text-white rounded-lg"
          onClick={() =>
            prevLectureId && navigate(`/classroom/${courseId}/${prevLectureId}`)
          }
        >
          이전 강의
        </button>
        <div className="px-3 text-white font-NanumSquareRoundBold">
          {nowSeq}/{total}
        </div>
        <button
          className="py-1 px-2 border text-white rounded-lg"
          onClick={() =>
            nextLectureId && navigate(`/classroom/${courseId}/${nextLectureId}`)
          }
        >
          다음 강의
        </button>
      </div>
      <div className="sm:flex-1 px-2 flex-center justify-end">
        <button
          onClick={() => {
            mutate(undefined, {
              onSuccess: (data) => {
                if (data.data.ok) {
                  if (nextLectureId) {
                    navigate(`/classroom/${courseId}/${nextLectureId}`);
                  }
                } else {
                  alert(data.data.error);
                }
              },
            });
          }}
          disabled={isLoading}
          className="flex-none h-7 px-4 bg-lightindigo border-lightgray border text-lightgray font-NanumSquareRoundBold text-sm rounded-lg"
        >
          수강 완료
        </button>
      </div>
    </div>
  );
};

export default Footer;

/**
 * 코스명 표시
 * recoil을 활용해 complete버튼 만들기 -> CR 생성 + 다음강의 이동
 */
