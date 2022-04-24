import { Common } from "components";
import React, { Suspense, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <Common.Profile />
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
    if (inputRef.current) {
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
