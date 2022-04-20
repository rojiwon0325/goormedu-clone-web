import React, { useEffect, useRef, useState } from "react";
import {
  useCreateTeacherRecord,
  useTeacherRecord,
  useUpdateTeacherRecord,
} from "states/server/user";

const TeacherProfile: React.FC<{ open: boolean; teacherId: number }> = ({
  open,
  teacherId,
}) => {
  const [active, setActive] = useState(open);
  const [btnValue, setValue] = useState("신청");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: teacherData } = useTeacherRecord(teacherId);
  const { mutate: createTR, isLoading: createLoading } =
    useCreateTeacherRecord();
  const { mutate: updateTR, isLoading: updateLoading } =
    useUpdateTeacherRecord();

  const onClick = () => {
    if (createLoading || updateLoading) {
      return;
    } else if (inputRef.current === null) {
      return;
    } else if (teacherData === undefined) {
      return;
    }
    if (
      teacherData.data.ok === false &&
      teacherData.data.error === "해당 정보가 존재하지 않습니다."
    ) {
      createTR({ career: inputRef.current.value });
    } else if (teacherData.data.ok) {
      updateTR({ career: inputRef.current.value });
    }
  };

  useEffect(() => {
    if (teacherData?.data.ok) {
      setValue("수정");
      if (inputRef.current) {
        inputRef.current.value = teacherData.data.result.career ?? "";
      }
    }
  }, [teacherData]);

  return (
    <>
      <button
        className="py-2 px-3 bg-gray229 text-black text-base rounded-lg shadow-md"
        onClick={() => setActive((pre) => !pre)}
      >
        교육자 정보
      </button>
      <div
        className={`${
          active ? "max-h-screen" : "max-h-0"
        } flex flex-col overflow-hidden transition-all`}
      >
        <div className="w-full pt-3 grid grid-cols-4 gap-y-3">
          <div className="h-11 flex flex-col justify-center">전문 분야</div>
          <div className="h-11 col-span-3 bg-gray229 rounded-lg">
            <input
              ref={inputRef}
              disabled={teacherData === undefined}
              className="hwfull py-2 px-3 bg-transparent placeholder:text-base"
              placeholder="전문 분야"
              name="career"
            />
          </div>
          {teacherData?.data.ok ? (
            <>
              <div className="h-7 flex items-center">승인 여부</div>
              <div className="h-7 flex items-center col-span-3 font-NanumSquareRoundBold">
                {teacherData.data.result.accepted ? "승인" : "미승인"}
              </div>
            </>
          ) : null}
          <button
            className={`w-3/4 py-2 px-3 rounded-lg bg-blue text-white ${
              teacherData === undefined ? "opacity-50" : ""
            }`}
            onClick={onClick}
            disabled={teacherData === undefined}
          >
            {btnValue}
          </button>
        </div>
      </div>
    </>
  );
};

export default TeacherProfile;
