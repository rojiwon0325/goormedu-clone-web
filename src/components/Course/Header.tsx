import { ICourse } from "interfaces/course";
import { ILearnRecord } from "interfaces/user";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CourseLectureList } from "states/client";
import { useCourse, useLearn, useLearnRecord } from "states/server/course";
import HeaderSkeleton from "./HeaderSkeleton";

const Header: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data: courseData } = useCourse(courseId);
  const { data: learnRecordData } = useLearnRecord(courseId);

  if (courseData?.data.ok && learnRecordData?.data) {
    return (
      <HeaderContent
        course={courseData.data.result}
        {...(learnRecordData.data.ok && {
          learnRecord: learnRecordData.data.result,
        })}
      />
    );
  } else {
    return <HeaderSkeleton />;
  }
};

export default Header;

const HeaderContent: React.FC<{
  course: ICourse;
  learnRecord?: ILearnRecord;
}> = ({ course: { id, title, cover_image }, learnRecord }) => {
  const navigate = useNavigate();
  const { mutate: learn, isLoading } = useLearn(id);
  const courseLectureList = useRecoilValue(CourseLectureList);
  const [lectures, setLectures] = useState<number[]>([]);

  const onClick = useCallback(() => {
    if (learnRecord) {
      if (learnRecord.last_lecture_id) {
        navigate(`/classroom/${id}/${learnRecord.last_lecture_id}`);
      } else if (lectures[0]) {
        navigate(`/classroom/${id}/${lectures[0]}`);
      } else {
        alert("강의가 존재하지 않습니다.");
      }
    } else if (!isLoading) {
      learn(undefined, {
        onSuccess: (data) => {
          if (data.data.ok && lectures[0]) {
            navigate(`/classroom/${id}/${lectures[0]}`);
          }
        },
      });
    }
  }, [id, isLoading, learn, learnRecord, lectures, navigate]);

  useEffect(() => {
    const list = courseLectureList[id];
    if (list) setLectures(list.map((lecture) => lecture.id));
  }, [courseLectureList, id]);

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between">
      <div
        className="w-full sm:w-64 md:w-80 aspect-video flex-none bg-white bg-cover bg-center rounded-lg"
        style={{ backgroundImage: `url(${cover_image})` }}
      />
      <div className="w-full flex flex-col items-start justify-between py-2 sm:py-0 sm:px-4">
        <div className="h-7 text-lg font-NanumSquareRoundBold overflow-hidden">
          {title}
        </div>
        {learnRecord?.last_lecture_id ? (
          <div className="h-7 w-full overflow-hidden">마지막 강의</div>
        ) : null}
        <div className="w-full">
          <div className="h-5 text-sm">
            강의 진행도
            {learnRecord?.count_completion_record ?? 0 / (lectures.length || 1)}
            %
          </div>
          <div className="h-5 w-full bg-blue rounded-lg overflow-hidden relative">
            <div
              className="hwfull bg-gray190 absolute"
              style={{
                transform: `translateX(${
                  learnRecord?.count_completion_record ??
                  0 / (lectures.length || 1)
                }%)`,
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full sm:w-auto flex flex-col flex-none">
        <button
          onClick={onClick}
          className="w-full py-2 px-3 bg-blue text-white font-NanumSquareRoundBold rounded-lg"
        >
          {learnRecord ? "강의 듣기" : "수강 신청"}
        </button>
      </div>
    </div>
  );
};
