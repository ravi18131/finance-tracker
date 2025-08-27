import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,           // fine as is
      gcTime: 1000 * 60 * 5,          // use gcTime (v5+)
    },
  },
});
