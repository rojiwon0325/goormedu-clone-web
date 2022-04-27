import { QueryClient } from "react-query";

export const api = process.env.REACT_APP_API_URL;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { suspense: true /*staleTime: 1000 * 60 * 5*/ },
  },
});
