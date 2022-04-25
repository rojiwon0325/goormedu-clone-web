import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  Classroom,
  Common,
  Course,
  Home,
  Main,
  Teacher,
  User,
} from "components";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main.Layout />}>
        <Route index element={<Navigate to="category" replace />} />
        <Route path="category" element={<Home.Category />} />
        <Route path="search" element={<Home.Search />} />
        <Route path="users" element={<User.Layout />} />
        <Route path="courses/:course_id" element={<Course.DashBoard />} />
        <Route path="teacher" element={<Teacher.Layout />}>
          <Route path="create" element={<Teacher.CreateDashBoard />} />
          <Route path=":course_id" element={<Teacher.UpdateDashBoard />}>
            <Route index element={<Teacher.CourseDashBoard />} />
            <Route
              path="chapters/:chapter_id"
              element={<Teacher.ChapterDashBoard />}
            />
            <Route
              path="lectures/:lecture_id"
              element={<Teacher.LectureDashBoard />}
            />
          </Route>
        </Route>
        <Route path="*" element={<Common.NotFound />} />
      </Route>
      <Route
        path="/classroom/:course_id/:lecture_id"
        element={<Classroom.Layout />}
      />
    </Routes>
  );
};

export default App;
