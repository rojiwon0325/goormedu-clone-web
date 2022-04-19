import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { suspense: true, staleTime: 1000 * 60 * 5 },
  },
});
