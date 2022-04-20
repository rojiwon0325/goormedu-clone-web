import React, { Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedUserNav } from "states/client";
import Profile from "./Profile";
import UserNav from "./UserNav";

const UserLayout: React.FC = () => {
  const [selected, select] = useRecoilState(SelectedUserNav);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    select("profile");
  }, [select]);

  useEffect(() => {
    setOpen(false);
  }, [selected]);

  return (
    <div className="max-w md:py-5 flex items-start">
      <div className="flex-none hidden md:flex">
        <Suspense>
          <UserNav />
        </Suspense>
      </div>
      <div className="flex-1 md:pl-4 relative">
        <button
          className="w-full py-2 px-3 mt-3 mb-2  md:hidden rounded-lg bg-blue text-white"
          onClick={() => setOpen((pre) => !pre)}
        >
          목록
        </button>
        <div
          className={`hwfull ${
            open ? "max-h-screen" : "max-h-0"
          } md:hidden bg-white transition-all overflow-hidden absolute z-50`}
        >
          <Suspense>
            <UserNav top />
          </Suspense>
        </div>
        <div className="w-full">
          <Suspense>
            {selected === "profile" ? <Profile /> : null}
            {selected === "my-learnings" ? <Profile /> : null}
            {selected === "my-offerings" ? <Profile /> : null}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
