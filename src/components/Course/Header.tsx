import { ILearnRecord } from "interfaces/user";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { CourseLectureList } from "states/client";
import {
  useCourse,
  useLearn,
  useLearnRecord,
  useLectureDetail,
} from "states/server/course";
import HeaderSkeleton from "./HeaderSkeleton";

const Header: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data: courseData } = useCourse(courseId);

  if (courseData?.data.ok) {
    return (
      <div className="w-full flex flex-col sm:flex-row justify-between">
        <Helmet>
          <title>{courseData.data.result.title} | GoormEdu</title>
        </Helmet>
        <div
          className="w-full sm:w-64 md:w-80 aspect-video flex-none bg-white bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url(${courseData.data.result.cover_image})`,
          }}
        />
        <div className="w-full flex flex-col items-start justify-between py-2 sm:py-0 sm:px-4">
          <div className="h-7 text-lg font-NanumSquareRoundBold overflow-hidden">
            {courseData.data.result.title}
          </div>
          <Suspense
            fallback={
              <div className="w-full">
                <div className="h-5 text-sm">강의 진행도 0%</div>
                <div className="h-5 w-full bg-gray190 rounded-lg overflow-hidden relative" />
              </div>
            }
          >
            <LearnRecordInfo courseId={courseData.data.result.id} />
          </Suspense>
        </div>
        <div className="w-full sm:w-auto flex flex-col flex-none">
          <Suspense
            fallback={
              <button className="w-full py-2 px-3 bg-gray122 text-white font-NanumSquareRoundBold cursor-default rounded-lg">
                수강 신청
              </button>
            }
          >
            <LearnButton courseId={courseData.data.result.id} />
          </Suspense>
        </div>
      </div>
    );
  } else {
    return <HeaderSkeleton />;
  }
};

export default Header;

const LearnRecordInfo: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { data: learnRecordData } = useLearnRecord(courseId);
  const [learnRecord, setLearnRecord] = useState<ILearnRecord>();
  const courseLectureList = useRecoilValue(CourseLectureList);

  useEffect(() => {
    if (learnRecordData?.data.ok) {
      setLearnRecord(learnRecordData.data.result);
    }
  }, [learnRecordData]);

  if (learnRecord) {
    return (
      <>
        <Suspense>
          {learnRecord.last_lecture_id ? (
            <LastLecture
              courseId={courseId}
              lectureId={learnRecord.last_lecture_id}
            />
          ) : null}
        </Suspense>
        <div className="w-full">
          <div className="h-5 text-sm">
            강의 진행도
            {(learnRecord?.count_completion_record ?? 0) /
              (courseLectureList[courseId]?.length || 1)}
            %
          </div>
          <div className="h-5 w-full bg-blue rounded-lg overflow-hidden relative">
            <div
              className="hwfull bg-gray190 absolute"
              style={{
                transform: `translateX(${
                  (learnRecord?.count_completion_record ?? 0) /
                  (courseLectureList[courseId]?.length || 1)
                }%)`,
              }}
            />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="w-full">
        <div className="h-5 text-sm">강의 진행도 0%</div>
        <div className="h-5 w-full bg-gray190 rounded-lg overflow-hidden relative" />
      </div>
    );
  }
};

const LastLecture: React.FC<{ courseId: number; lectureId: number }> = ({
  courseId,
  lectureId,
}) => {
  const navigate = useNavigate();
  const { data } = useLectureDetail(courseId, lectureId);

  if (data?.data.ok) {
    return (
      <div className="h-7 w-full flex overflow-hidden">
        최근에 들은 강의
        <div
          onClick={() => navigate(`/classroom/${courseId}/${lectureId}`)}
          className="flex-1 px-2 whitespace-nowrap overflow-hidden cursor-pointer hover:underline"
        >
          {data.data.result.title}
        </div>
      </div>
    );
  } else {
    return (
      <div
        onClick={() => navigate(`/classroom/${courseId}/${lectureId}`)}
        className="h-7 w-full flex overflow-hidden"
      >
        최근에 들은 강의
      </div>
    );
  }
};

const LearnButton: React.FC<{ courseId: number }> = ({ courseId }) => {
  const navigate = useNavigate();
  const { data: learnRecordData } = useLearnRecord(courseId);
  const courseLectureList = useRecoilValue(CourseLectureList);
  const { mutate: learn, isLoading } = useLearn(courseId);
  const [value, setValue] = useState("수강 신청");

  const onClick = useCallback(() => {
    if (learnRecordData) {
      if (learnRecordData.data.ok) {
        if (learnRecordData.data.result.last_lecture_id) {
          navigate(
            `/classroom/${courseId}/${learnRecordData.data.result.last_lecture_id}`
          );
        } else {
          const lectures = courseLectureList[courseId];
          if (lectures && lectures[0]) {
            navigate(`/classroom/${courseId}/${lectures[0]}`);
          } else {
            alert("강의가 존재하지 않습니다.");
          }
        }
      } else if (!isLoading) {
        learn();
      }
    }
  }, [
    courseId,
    courseLectureList,
    isLoading,
    learn,
    learnRecordData,
    navigate,
  ]);

  useEffect(() => {
    if (learnRecordData?.data.ok) {
      setValue("강의 듣기");
    } else {
      setValue("수강 신청");
    }
  }, [learnRecordData]);

  return (
    <button
      onClick={onClick}
      className="w-full py-2 px-3 bg-blue text-white font-NanumSquareRoundBold rounded-lg"
    >
      {value}
    </button>
  );
};
