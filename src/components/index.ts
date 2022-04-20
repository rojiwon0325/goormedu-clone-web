import ErrorBoundary from "./Common/ErrorBoundary";
import NotFound from "./Common/NotFound";
import Provider from "./Common/Provider";
import SimpleLoadingCircle from "./Common/SimpleLoadingCircle";
import SVG from "./Common/SVG";
import Category from "./Home/Category";
import Search from "./Home/Search";
import Layout from "./Main/Layout";
import UserLayout from "./User/UserLayout";

export const Common = {
  ErrorBoundary,
  Provider,
  SimpleLoadingCircle,
  NotFound,
  SVG,
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
