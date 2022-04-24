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
import Profile from "./Common/Profile";

export const Common = {
  ErrorBoundary,
  Provider,
  SimpleLoadingCircle,
  NotFound,
  SVG,
  Profile,
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
