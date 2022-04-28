import React, { Suspense, useRef } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useChapterCreate } from "states/server/course";
import UpdateNav from "./UpdateNav";

const UpdateDashBoard: React.FC = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  if (course_id) {
    return (
      <div className="w-full p-4 pr-0 flex">
        <div className="w-52 p-2 flex flex-col border-gray122 border bg-lightgray">
          <button
            onClick={() => navigate(`/teacher/${parseInt(course_id)}`)}
            className="py-1 px-2 bg-gray229 hover:bg-gray219 rounded-lg"
          >
            코스 정보 수정
          </button>
          <CreateChapter courseId={parseInt(course_id)} />
          <Suspense>
            <UpdateNav courseId={parseInt(course_id)} />
          </Suspense>
        </div>
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    );
  } else {
    return null;
  }
};

export default UpdateDashBoard;

const CreateChapter: React.FC<{ courseId: number }> = ({ courseId }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading } = useChapterCreate(courseId);

  const onClick = () => {
    if (inputRef.current?.value) {
      mutate({ title: inputRef.current.value });
      inputRef.current.value = "";
    } else {
      alert("제목이 필요합니다.");
    }
  };

  return (
    <div className="w-full py-2 my-2 flex bg-gray229 rounded-lg">
      <div className="h-full px-2 flex-center justify-start flex-1">
        <input
          ref={inputRef}
          placeholder="새 챕터 생성"
          disabled={isLoading}
          className="hwfull bg-transparent placeholder:text-gray175"
        />
      </div>
      <button
        onClick={onClick}
        disabled={isLoading}
        className="h-6 w-6 flex-none flex-center bg-gray203 hover:bg-gray190 rounded-lg"
      >
        +
      </button>
    </div>
  );
};
