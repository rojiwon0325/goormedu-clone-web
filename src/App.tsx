import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Common, Main } from "components";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main.Layout />}>
        <Route index element={<Navigate to="category" replace />} />
        <Route path="category" element={<div />} />
        <Route path="search" element={<div />} />
        <Route path="users" element={<div />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<div />} />
          <Route path="my-learnings" element={<div />} />
          <Route path="my-offerings" element={<div />} />
        </Route>
        <Route path="/courses/:course_id" element={<div />} />
        <Route path="/courses/:course_id/update" element={<div />} />
        <Route path="*" element={<Common.NotFound />} />
      </Route>
      <Route path="/classroom/:course_id/:lecture_id" element={<div />} />
    </Routes>
  );
};

export default App;
