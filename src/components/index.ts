import ErrorBoundary from "./Common/ErrorBoundary";
import NotFound from "./Common/NotFound";
import Provider from "./Common/Provider";
import SimpleLoadingCircle from "./Common/SimpleLoadingCircle";
import SVG from "./Common/SVG";
import DashBoard from "./Course/DashBoard";
import Category from "./Home/Category";
import Search from "./Home/Search";
import Layout from "./Main/Layout";
import UserLayout from "./User/UserLayout";
import ClassRoomLayout from "./Classroom/Layout";
import TeacherLayout from "./Teacher/Layout";
import Profile from "./Common/Profile";
import CreateDashBoard from "./Teacher/CreateDashBoard";
import UpdateDashBoard from "./Teacher/UpdateDashBoard";
import CourseDashBoard from "./Teacher/CourseDashBoard";
import ChapterDashBoard from "./Teacher/ChapterDashBoard";
import LectureDashBoard from "./Teacher/LectureDashBoard";
import DnDItem from "./Common/DnDItem";

export const Common = {
  ErrorBoundary,
  Provider,
  SimpleLoadingCircle,
  NotFound,
  SVG,
  Profile,
  DnDItem,
};

export const Main = {
  Layout,
};

export const Home = {
  Category,
  Search,
};

export const User = {
  Layout: UserLayout,
};

export const Course = {
  DashBoard,
};

export const Classroom = {
  Layout: ClassRoomLayout,
};

export const Teacher = {
  Layout: TeacherLayout,
  CreateDashBoard,
  UpdateDashBoard,
  CourseDashBoard,
  ChapterDashBoard,
  LectureDashBoard,
};
