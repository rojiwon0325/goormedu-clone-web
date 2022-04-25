import React from "react";
import { Outlet } from "react-router-dom";
import TeacherNav from "./TeacherNav";

const Layout: React.FC = () => {
  return (
    <div className="w-full flex">
      <TeacherNav />
      <Outlet />
    </div>
  );
};

export default Layout;
