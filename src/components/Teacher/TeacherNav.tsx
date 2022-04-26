import React, { Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useCoursesByOfferings } from "states/server/course";

const TeacherNav: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="m-4 mr-0 flex-center flex-col justify-start border-blue border flex-none">
      <button
        onClick={() => navigate("/teacher/create")}
        className={`w-full py-2 ${
          pathname === "/teacher/create"
            ? "font-NanumSquareRoundBold"
            : "font-NanumSquareRound"
        }`}
      >
        새 코스 생성
      </button>
      <div className="w-full text-center p-2 border-blue border-t">
        기존 코스 수정
      </div>
      <div className="w-full p-2 border-blue border-t">
        <Suspense>
          <div className="w-full flex-center flex-col">
            <OfferingList />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default TeacherNav;

const OfferingList: React.FC = () => {
  const navigate = useNavigate();
  const { course_id } = useParams();
  const { data } = useCoursesByOfferings();

  if (data?.data.ok) {
    return (
      <>
        {data.data.result.map((offering) => (
          <button
            key={`offernav-${offering.id}`}
            onClick={() => navigate(`/teacher/${offering.id}`)}
            className="w-full p-2 border-blue "
          >
            <div
              className={`hwfull whitespace-nowrap overflow-hidden ${
                (course_id &&
                  parseInt(course_id) === offering.id &&
                  "font-NanumSquareRoundBold") ??
                "font-NanumSquareRound"
              } hover:bg-skyblue`}
            >
              {offering.title}
            </div>
          </button>
        ))}
      </>
    );
  } else {
    return null;
  }
};
