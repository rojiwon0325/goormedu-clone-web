import { Common } from "components";
import { SVGName } from "components/Common/SVG";
import { IUserDetail, UserNav as IUserNav, UserRole } from "interfaces/user";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { SelectedUserNav } from "states/client";
import { useProfile } from "states/server/user";

const UserNav: React.FC<{ top?: boolean }> = ({ top = false }) => {
  const { data } = useProfile();
  const [user, setUser] = useState<IUserDetail>();

  useEffect(() => {
    if (data?.data.ok) {
      setUser(data.data.result);
    }
  }, [data]);

  return (
    <div className="flex-center flex-col select-none pb-4">
      {top ? null : (
        <div className="pt-2 px-3">
          <div className="font-NanumSquareRoundBold text-lg">
            반가워요, {user?.username}님!
          </div>
          <div className="text-blue">{UserRole[user?.role ?? "Unknown"]}</div>
        </div>
      )}
      <Btn title="내 정보" navtype="profile" svgname="settings" />
      <Btn title="수강 목록" navtype="my-learnings" svgname="monitor" />
      {user?.role === "Teacher" ? (
        <Btn title="담당 코스" navtype="my-offerings" svgname="checklist" />
      ) : null}
    </div>
  );
};

export default UserNav;

const Btn: React.FC<{
  title: string;
  svgname: SVGName;
  navtype: IUserNav;
}> = ({ title, svgname, navtype }) => {
  const [selected, select] = useRecoilState(SelectedUserNav);
  return (
    <div className="w-full py-3 px-5 flex-center border-blue border-b">
      <button
        onClick={() => select(navtype)}
        disabled={selected === navtype}
        className="w-full flex-center cursor-pointer"
      >
        <Common.SVG name={svgname} className="h-7 w-7 p-1.5" />
        <div
          className={`${
            selected === navtype ? "font-NanumSquareRoundExtraBold" : ""
          } flex-1 text-center`}
        >
          {title}
        </div>
      </button>
    </div>
  );
};
