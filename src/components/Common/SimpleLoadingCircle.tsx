import React from "react";
import { Helmet } from "react-helmet-async";

const SimpleLoadingCircle = () => (
  <div className="hwfull flex-center p-10">
    <Helmet>
      <title>Loading...</title>
    </Helmet>
    <div className="h-full max-h-52 aspect-square border-gray203 border-t-lightgray border-8 rounded-full animate-spin" />
  </div>
);

export default SimpleLoadingCircle;
