import React from "react";
import { Helmet } from "react-helmet-async";

const SimpleLoadingCircle = () => (
  <div className="hwfull flex-center p-10">
    <Helmet>
      <title>Loading...</title>
    </Helmet>
    <div className="hwfull max-h-48 max-w-48 border-gray-500 border-t-gray-100 border-8 rounded-full animate-spin" />
  </div>
);

export default SimpleLoadingCircle;
