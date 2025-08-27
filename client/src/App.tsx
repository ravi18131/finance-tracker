import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Router } from "@/Router";
import { Toaster } from "./components/ui/sonner";
import { queryClient } from "./lib/query-client";
import { SessionProvider } from "@/context/session-context"

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Router />
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </SessionProvider>
    </QueryClientProvider>
  );
}
