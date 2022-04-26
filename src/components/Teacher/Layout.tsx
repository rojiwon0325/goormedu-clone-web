import React from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import TeacherNav from "./TeacherNav";

const Layout: React.FC = () => {
  return (
    <div className="w-full flex">
      <Helmet>
        <title>교육 관리 | GoormEdu</title>
      </Helmet>
      <TeacherNav />
      <Outlet />
    </div>
  );
};

export default Layout;
