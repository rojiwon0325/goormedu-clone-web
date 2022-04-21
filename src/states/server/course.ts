import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { QueryResult } from "interfaces/query";
import { ICourse, IChapter, ILecture } from "interfaces/course";
import { api, queryClient } from "./index";
import { ILearnRecord, ILearnRecordDetail } from "interfaces/user";

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

export const useCoursesByLearnings = () =>
  useQuery<QueryResult<ICourse[]>>(
    ["courses", "my-learnings"],
    () => axios.get(`${api}/courses/learning-list`, { withCredentials: true }),
    {
      onError: alert,
      onSuccess: (data) => !data.data.ok && alert(data.data.error),
    }
  );

export const useCoursesByOfferings = () =>
  useQuery<QueryResult<ICourse[]>>(
    ["courses", "my-offerings"],
    () => axios.get(`${api}/courses/offering-list`, { withCredentials: true }),
    {
      onError: alert,
      onSuccess: (data) => !data.data.ok && alert(data.data.error),
    }
  );

export const useCourse = (courseId: number) =>
  useQuery<QueryResult<ICourse>>(["courses", courseId], () =>
    axios.get(`${api}/courses/${courseId}`)
  );

export const useLearnRecord = (courseId: number) =>
  useQuery<QueryResult<ILearnRecord>>(
    ["courses", courseId, "learn-record"],
    () =>
      axios.get(`${api}/courses/${courseId}/learn-record`, {
        withCredentials: true,
      })
  );

export const useLearn = (courseId: number) =>
  useMutation<QueryResult<ILearnRecordDetail>>(
    () =>
      axios.post(
        `${api}/courses/${courseId}/learn`,
        {},
        { withCredentials: true }
      ),
    {
      onError: alert,
      onSuccess: (data) => {
        if (data.data.ok) {
          queryClient.setQueryData(["courses", courseId, "learn-record"], {
            data: { ok: true, result: data.data.result },
          });
        } else {
          alert(
            data.data.error === "Jwt Not Authenticated"
              ? "로그인이 필요합니다."
              : data.data.error
          );
        }
      },
    }
  );

export const useChapters = (courseId: number) =>
  useQuery<QueryResult<IChapter[]>>(["courses", courseId, "chapters"], () =>
    axios.get(`${api}/courses/${courseId}/chapters`)
  );

export const useLectures = (courseId: number, chapterId: number) =>
  useQuery<QueryResult<ILecture[]>>(
    ["courses", courseId, "chapters", chapterId, "lectures"],
    () => axios.get(`${api}/courses/${courseId}/chapters/${chapterId}/lectures`)
  );
