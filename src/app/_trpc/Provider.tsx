// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import React, { useState } from "react";
// import { trpc } from "@/app/_trpc/client";

// export function Provider({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     // <trpc.Provider queryClient={queryClient}>
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//     // </trpc.Provider>
//   );
// }

//v1
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";
import { trpc } from "./client";

export function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5645/api/trpc" })],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
