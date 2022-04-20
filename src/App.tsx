import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Common, Home, Main, User } from "components";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main.Layout />}>
        <Route index element={<Navigate to="category" replace />} />
        <Route path="category" element={<Home.Category />} />
        <Route path="search" element={<Home.Search />} />
        <Route path="users" element={<User.Layout />} />
        <Route path="/courses/:course_id" element={<div />} />
        <Route path="/courses/:course_id/update" element={<div />} />
        <Route path="*" element={<Common.NotFound />} />
      </Route>
      <Route path="/classroom/:course_id/:lecture_id" element={<div />} />
    </Routes>
  );
};

export default App;
