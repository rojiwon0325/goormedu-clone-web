import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="hwfull flex-center">
    <Helmet>
      <title>GoormEdu | NotFound</title>
    </Helmet>
    <h1>Page Not Found</h1>
    <Link to="/">Go To Home</Link>
  </div>
);
export default NotFound;
