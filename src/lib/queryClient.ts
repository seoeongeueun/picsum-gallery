import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 60 * 1, // 1시간
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
