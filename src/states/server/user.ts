import { api, queryClient } from "./index";
import {
  CreateTeacherRecord,
  ITeacherRecord,
  IUserDetail,
  IUserPublic,
} from "interfaces/user";
import { QueryResult } from "interfaces/query";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const useProfile = () =>
  useQuery<QueryResult<IUserDetail>>(
    ["users", "profile"],
    () => axios.get(`${api}/users/profile`, { withCredentials: true }),
    {
      staleTime: 0,
      onSuccess: ({ data }) =>
        data.ok
          ? queryClient.setQueryData(["users", data.result.id], {
              data: { ok: true, result: data.result },
            })
          : null,

      onError: alert,
    }
  );

export const useUser = (userId: number) =>
  useQuery<QueryResult<IUserPublic>>(["users", userId], () =>
    axios.get(`${api}/users/${userId}`)
  );

export const useTeacherRecord = (userId: number) =>
  useQuery<QueryResult<ITeacherRecord>>(
    ["users", userId, "teacher-record"],
    () => axios.get(`${api}/teacher-records/${userId}`)
  );

export const useCreateTeacherRecord = () =>
  useMutation(
    (body: CreateTeacherRecord) =>
      axios.post(`${api}/teacher-records/create`, body, {
        withCredentials: true,
      }),
    {
      onError: alert,
      onSuccess: (data: QueryResult<ITeacherRecord>) => {
        if (data.data.ok) {
          queryClient.setQueryData(
            ["users", data.data.result.user_id, "teacher-record"],
            {
              data: { ok: true, result: data.data.result },
            }
          );
          alert("신청되었습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );
export const useUpdateTeacherRecord = () =>
  useMutation(
    (body: CreateTeacherRecord) =>
      axios.post(`${api}/teacher-records/update`, body, {
        withCredentials: true,
      }),
    {
      onError: alert,
      onSuccess: (data: QueryResult<ITeacherRecord>) => {
        if (data.data.ok) {
          queryClient.setQueryData(
            ["users", data.data.result.user_id, "teacher-record"],
            {
              data: { ok: true, result: data.data.result },
            }
          );
          alert("수정되었습니다.");
        } else {
          alert(data.data.error);
        }
      },
    }
  );
