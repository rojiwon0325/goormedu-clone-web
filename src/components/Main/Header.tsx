import { Common } from "components";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProfile } from "states/server/user";

const Header: React.FC = () => {
  return (
    <header className="h-14 md:h-20 w-full flex-center border-gray86 border-b z-50">
      <div className="h-full max-w flex-center justify-between">
        <div className="h-full flex-1 flex-center justify-between relative">
          <Logo />
          <Search />
        </div>
        <div className="header-h flex-center justify-end flex">
          <Suspense
            fallback={
              <div className="header-h header-w rounded-full border-gray175 border-t-gray219 border-4 animate-spin" />
            }
          >
            <Profile />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;

const Logo: React.FC = () => (
  <div className="h-full flex-none flex items-center">
    <Link to="/">
      <img
        src="https://statics.goorm.io/logo/edu/goormedu-public.svg"
        className="h-7 md:h-8"
        alt=""
      />
    </Link>
  </div>
);

const Search: React.FC = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState(false);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search && inputRef.current) {
      const query = inputRef.current.value.trim();
      inputRef.current.value = "";
      if (query.length > 0) {
        navigate(`/search?query=${query}`);
      }
    }
  };
  return (
    <div
      className={`header-h ${
        search ? "w-full pl-4" : "header-w"
      } md:w-full md:max-w-lg md:pl-0 mr-4 bg-white transition-width absolute right-0`}
    >
      <form className="hwfull relative" onSubmit={onSubmit}>
        <div className="hwfull border-gray203 border bg-lightgray rounded-full">
          <input
            ref={inputRef}
            name="search"
            className="hwfull pl-5 pr-9 md:pr-14 font-NanumSquareRound bg-transparent select-text"
            placeholder="검색"
            disabled={!search}
          />
        </div>
        <button
          className="header-h header-w rounded-full bg-gray86 flex-none absolute right-0 top-0"
          onClick={() => {
            setSearch((pre) => !pre);
          }}
        >
          <Common.SVG name="search" className="p-2 md:p-3" />
        </button>
      </form>
    </div>
  );
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { data: userData } = useProfile();
  const logoutRef = useRef<HTMLAnchorElement>(null);

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
      <a
        ref={logoutRef}
        href={`${process.env.REACT_APP_API_URL}/auth/logout`}
        className="hidden"
      >
        로그아웃
      </a>
    );
  }
  return (
    <div className="flex items-center flex-none">
      {userData.data.ok ? (
        <div className="relative group">
          <button className="header-h header-w bg-blue rounded-full">
            <Common.SVG name="person" className="p-2" />
          </button>
          <div className="max-h-0 group-hover:max-h-96 overflow-hidden transition-height absolute top-7 md:top-11 -right-5">
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
