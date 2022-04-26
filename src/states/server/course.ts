import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { QueryResult } from "interfaces/query";
import {
  ICourse,
  IChapter,
  ILecture,
  ICompletionRecord,
  ILectureDetail,
  ICourseDetail,
  IChapterDetail,
} from "interfaces/course";
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
      enabled: !!categoryId,
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
  useQuery<QueryResult<ICourse>>(
    ["courses", courseId],
    () => axios.get(`${api}/courses/${courseId}`),
    {
      enabled: !!courseId,
    }
  );

export const useCourseCreate = () =>
  useMutation(
    (body: FormData) =>
      axios.post(`${api}/courses/create`, body, { withCredentials: true }),
    {
      onSuccess: (data: QueryResult<ICourseDetail>) => {
        if (data.data.ok) {
          queryClient.setQueryData(["courses", data.data.result.id], data);
          queryClient.invalidateQueries(["courses", "my-offerings"]);
        }
      },
    }
  );

export const useCourseUpdate = (courseId: number) =>
  useMutation(
    (body: FormData) =>
      axios.post(`${api}/courses/${courseId}/update`, body, {
        withCredentials: true,
      }),
    {
      onError: alert,
      onSuccess: (data: QueryResult<ICourseDetail>) => {
        if (data.data.ok) {
          queryClient.invalidateQueries(["courses"]);
          alert("수정되었습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useLearnRecord = (courseId: number) =>
  useQuery<QueryResult<ILearnRecord>>(
    ["courses", courseId, "learn-record"],
    () =>
      axios.get(`${api}/courses/${courseId}/learn-record`, {
        withCredentials: true,
      }),
    {
      enabled: !!courseId,
    }
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

export const useChapterCreate = (courseId: number) =>
  useMutation(
    (body: { title: string }) =>
      axios.post(`${api}/courses/${courseId}/chapters/create`, body, {
        withCredentials: true,
      }),
    {
      onError: alert,
      onSuccess: (data: QueryResult<IChapterDetail>) => {
        if (data.data.ok) {
          queryClient.invalidateQueries([
            "courses",
            data.data.result.course_id,
            "chapters",
          ]);
          alert("챕터를 생성했습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useChapterDelete = (courseId: number, chapterId: number) =>
  useMutation(
    () =>
      axios.post(
        `${api}/courses/${courseId}/chapters/${chapterId}/delete`,
        {},
        {
          withCredentials: true,
        }
      ),
    {
      onError: alert,
      onSuccess: (data: QueryResult<{ id: number; teacher_id: number }>) => {
        if (data.data.ok) {
          queryClient.invalidateQueries(["courses", courseId, "chapters"]);
          alert("챕터를 삭제했습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useChapterUpdate = (courseId: number, chapterId: number) =>
  useMutation(
    (body: { title: string }) =>
      axios.post(
        `${api}/courses/${courseId}/chapters/${chapterId}/update`,
        body,
        { withCredentials: true }
      ),
    {
      onSuccess: (data: QueryResult<IChapterDetail>) => {
        if (data.data.ok) {
          queryClient.invalidateQueries(["courses", courseId, "chapters"]);
          alert("챕터가 수정되었습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useLectures = (courseId: number, chapterId: number) =>
  useQuery<QueryResult<ILecture[]>>(
    ["courses", courseId, "chapters", chapterId, "lectures"],
    () => axios.get(`${api}/courses/${courseId}/chapters/${chapterId}/lectures`)
  );

export const useLectureCreate = (courseId: number) =>
  useMutation(
    (body: FormData) =>
      axios.post(`${api}/courses/${courseId}/lectures/create`, body, {
        withCredentials: true,
      }),
    {
      onError: alert,
      onSuccess: (data: QueryResult<ILectureDetail>) => {
        if (data.data.ok) {
          queryClient.invalidateQueries([
            "courses",
            courseId,
            "chapters",
            data.data.result.chapter_id,
            "lectures",
          ]);
          alert("강의를 생성했습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useLectureDetail = (courseId: number, lectureId: number) =>
  useQuery<QueryResult<ILectureDetail>>(
    ["course", courseId, "lectures", lectureId],
    () =>
      axios.get(`${api}/courses/${courseId}/lectures/${lectureId}/detail`, {
        withCredentials: true,
      }),
    {
      enabled: !!courseId && !!lectureId,
    }
  );

export const useLectureUpdate = (courseId: number, lectureId: number) =>
  useMutation(
    (body: FormData) =>
      axios.post(
        `${api}/courses/${courseId}/lectures/${lectureId}/update`,
        body,
        { withCredentials: true }
      ),
    {
      onError: alert,
      onSuccess: (data: QueryResult<ILectureDetail>) => {
        if (data.data.ok) {
          queryClient.invalidateQueries(["courses", courseId, "chapters"]);
          queryClient.setQueryData(
            ["courses", courseId, "lectures", lectureId],
            data.data.result
          );
          alert("강의가 수정되었습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useLectureDelete = (courseId: number, lectureId: number) =>
  useMutation(
    () =>
      axios.post(
        `${api}/courses/${courseId}/lectures/${lectureId}/delete`,
        {},
        { withCredentials: true }
      ),
    {
      onError: alert,
      onSuccess: (
        data: QueryResult<{
          id: number;
          teacher_id: number;
          course_id: number;
          chapter_id: number;
        }>
      ) => {
        if (data.data.ok) {
          queryClient.invalidateQueries([
            "courses",
            courseId,
            "chapters",
            data.data.result.chapter_id,
            "lectures",
          ]);
          alert("강의를 제거했습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );

export const useCompletionRecord = (courseId: number, lectureId: number) =>
  useQuery<QueryResult<ICompletionRecord>>(
    ["courses", courseId, "lectures", lectureId],
    () =>
      axios.get(
        `${api}/courses/${courseId}/lectures/${lectureId}/completion-record`,
        { withCredentials: true }
      )
  );

export const useComplete = (courseId: number, lectureId: number) =>
  useMutation<QueryResult<ICompletionRecord>>(() => axios.post(""));
