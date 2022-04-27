import React, { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCourse,
  useLearnStart,
  useLectureDetail,
} from "states/server/course";
import Footer from "./Footer";
import Header from "./Header";
import Player from "./Player";

const Layout: React.FC = () => {
  const { course_id, lecture_id } = useParams();
  const courseId = course_id ? parseInt(course_id) : 0;
  const lectureId = lecture_id ? parseInt(lecture_id) : 0;
  if (courseId && lectureId) {
    return (
      <Suspense>
        <APILayer courseId={courseId} lectureId={lectureId} />
      </Suspense>
    );
  } else {
    return null;
  }
};

export default Layout;

const APILayer: React.FC<{ courseId: number; lectureId: number }> = ({
  courseId,
  lectureId,
}) => {
  const navigate = useNavigate();
  const { data: courseData } = useCourse(courseId);
  const { data: lectureData } = useLectureDetail(courseId, lectureId);
  const { mutate } = useLearnStart(courseId, lectureId);

  useEffect(() => {
    if (courseData && lectureData) {
      if (!courseData.data.ok) {
        alert(courseData.data.error);
        navigate(-1);
      } else if (!lectureData.data.ok) {
        alert(
          lectureData.data.error === "Jwt Not Authenticated"
            ? "로그인이 필요합니다."
            : lectureData.data.error
        );
        navigate(-1);
      } else {
        mutate();
      }
    }
  }, [courseData, lectureData, navigate, mutate]);

  if (courseData?.data.ok && lectureData?.data.ok) {
    return (
      <div className="hwfull flex flex-col relative">
        <Header
          lectureTitle={lectureData.data.result.title}
          courseId={courseData.data.result.id}
          courseTitle={courseData.data.result.title}
        />
        <div className="w-full py-11 flex flex-col flex-1 overflow-hidden">
          {lectureData.data.result.video_url ? (
            <Player
              key={`video-${lectureData.data.result.id}`}
              videoUrl={lectureData.data.result.video_url}
              heightFull={!lectureData.data.result.content}
            />
          ) : null}
          <section className="flex-1 w-full flex justify-center overflow-scroll">
            <div className="w-full p-4 sm:w-1/2 max-w-7xl">
              {lectureData.data.result.content}
            </div>
          </section>
        </div>
        <Footer
          courseId={courseData.data.result.id}
          lectureId={lectureData.data.result.id}
          courseTitle={courseData.data.result.title}
        />
      </div>
    );
  } else {
    return null;
  }
};
