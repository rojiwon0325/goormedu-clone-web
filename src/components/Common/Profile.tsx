import { Common } from "components";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "states/server/user";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { data: userData } = useProfile();
  const logoutRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      userData?.data.ok === false &&
      userData.data.error !== "Jwt Not Authenticated" &&
      logoutRef.current
    ) {
      logoutRef.current.click();
    }
  }, [userData]);

  if (userData === undefined) {
    return (
      <>
        <div className="header-h header-w rounded-full border-gray175 border-t-gray219 border-4 animate-spin" />
        <a
          ref={logoutRef}
          href={`${process.env.REACT_APP_API_URL}/auth/logout`}
          className="hidden"
        >
          로그아웃
        </a>
      </>
    );
  }
  return (
    <div className="h-full flex items-center flex-none">
      {userData.data.ok ? (
        <div className="h-full relative group" ref={navRef} tabIndex={-1}>
          <button
            onClick={() => navRef.current?.focus()}
            className="h-full aspect-square bg-blue rounded-full"
          >
            <Common.SVG name="person" className="p-2" />
          </button>
          <div className="max-h-0 group-focus-within:max-h-96 overflow-hidden transition-height absolute top-2 md:top-6 -right-5 z-50">
            <ul className="py-5 pl-10 pr-6 m-5 flex flex-col items-end rounded-lg bg-lightgray shadow-md">
              <li>
                <button
                  onClick={() => navigate("/users")}
                  className="whitespace-nowrap text-base"
                >
                  내 정보
                </button>
              </li>
              <li>
                <a
                  ref={logoutRef}
                  href={`${process.env.REACT_APP_API_URL}/auth/logout`}
                  className="whitespace-nowrap text-base"
                >
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <a
          href={`${process.env.REACT_APP_API_URL}/auth/google/login`}
          className="font-NanumSquareRoundBold whitespace-nowrap md:text-lg"
        >
          로그인
        </a>
      )}
    </div>
  );
};

export default Profile;
