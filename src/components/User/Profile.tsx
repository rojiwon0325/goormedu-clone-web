import { UserRole } from "interfaces/user";
import React, { Suspense } from "react";
import { useProfile } from "states/server/user";
import TeacherProfile from "./TeacherProfile";

const Profile: React.FC = () => {
  const { data: userData } = useProfile();
  if (userData?.data.ok) {
    return (
      <div className="w-full p-5 md:p-10 flex flex-col border-gray175 border-4 rounded-lg animate-fade-in">
        <h1 className="pb-3 border-gray122 border-b font-NanumSquareRoundExtraBold text-xl">
          내 정보
        </h1>
        <div className="w-full pt-4 grid grid-cols-4 gap-y-1">
          <div>이름</div>
          <div className="col-span-3 font-NanumSquareRoundBold">
            {userData.data.result.username}
          </div>
          <div>이메일</div>
          <div className="col-span-3 font-NanumSquareRoundBold">
            {userData.data.result.email}
          </div>
          <div>권한</div>
          <div className="col-span-3 font-NanumSquareRoundBold">
            {UserRole[userData.data.result.role]}
          </div>
        </div>
        <div className="w-full pt-3">
          <Suspense
            fallback={
              <button className="py-2 px-3 bg-gray229 text-black text-base rounded-lg shadow-md">
                교육자 정보
              </button>
            }
          >
            <TeacherProfile
              open={userData.data.result.role === "Teacher"}
              teacherId={userData.data.result.id}
            />
          </Suspense>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Profile;
