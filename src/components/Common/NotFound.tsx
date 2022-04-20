import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="hwfull flex-center flex-col py-5">
    <Helmet>
      <title>GoormEdu | NotFound</title>
    </Helmet>
    <h1 className="mb-4 font-NanumSquareRoundExtraBold text-3xl">
      Page Not Found
    </h1>
    <Link to="/" className="hover:underline">
      Go To Home
    </Link>
  </div>
);
export default NotFound;
