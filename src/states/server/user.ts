import { IUserDetail, QueryResult } from "interfaces/user";
import { useQuery } from "react-query";
import axios from "axios";
import { queryClient } from ".";

const api = process.env.REACT_APP_API_URL;

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
