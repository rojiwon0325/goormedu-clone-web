import { Common } from "components";
import { UserNav as IUserNav } from "interfaces/user";
import React, { Suspense, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedUserNav } from "states/client";
import { useProfile } from "states/server/user";
import MyLearnings from "./MyLearnings";
import MyOfferings from "./MyOfferings";
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
    <div className="max-w pb-5 md:pt-5 flex items-start">
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
          className={`${
            open ? "h-auto" : "h-0"
          } md:hidden bg-white overflow-hidden`}
        >
          <Suspense>
            <UserNav top />
          </Suspense>
        </div>
        <DashBoardLayer selected={selected} />
      </div>
    </div>
  );
};

export default UserLayout;

const DashBoardLayer: React.FC<{ selected: IUserNav }> = ({ selected }) => {
  const { data: userData } = useProfile();
  if (userData?.data.ok) {
    switch (selected) {
      case "profile":
        return <Profile />;
      case "my-learnings":
        return <MyLearnings />;
      case "my-offerings":
        if (userData.data.result.role === "Teacher") {
          return <MyOfferings />;
        } else {
          return <Common.NotFound />;
        }
    }
  } else {
    return null;
  }
};
