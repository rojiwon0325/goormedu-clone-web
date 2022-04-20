import axios from "axios";
import { useQuery } from "react-query";
import { QueryResult } from "interfaces/query";
import { ICourse } from "interfaces/course";
import { api } from "./index";

export const useAllCourses = (categoryId: number) =>
  useQuery<QueryResult<ICourse[]>>(
    ["courses", "all"],
    () => axios.get(`${api}/courses`),
    {
      enabled: categoryId === 0,
    }
  );

export const useCoursesByCategory = (categoryId: number) =>
  useQuery<QueryResult<ICourse[]>>(
    ["courses", "category", categoryId],
    () => axios.get(`${api}/courses/category/${categoryId}`),
    {
      enabled: categoryId !== 0,
    }
  );

export const useCoursesBySearch = (query: string | null) =>
  useQuery<QueryResult<ICourse[]>>(
    ["courses", "search"],
    () => axios.get(`${api}/courses/search?query=${query}`),
    {
      enabled: !!(query && query.length > 0),
    }
  );
