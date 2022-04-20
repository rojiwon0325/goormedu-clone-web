import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = () => {
  return (
    <div className="hwfull flex-center flex-col justify-between">
      <div className="w-full flex-center flex-col">
        <Header />
        <div className="w-full flex-center">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
