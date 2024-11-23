//v1
import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server";

export const trpc = createTRPCReact<AppRouter>({});

// import { createTRPCNext } from "@trpc/next";
// import { AppRouter } from "@/server";

// export const trpc = createTRPCNext<AppRouter>({
//   config({ ctx }) {
//     return {
//       url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/trpc",
//       headers() {
//         // Since your app doesn't use authentication, you can simply return an empty object
//         // Or return any custom headers you need for other purposes
//         if (ctx?.req) {
//           return {
//             // For now, just return empty or specific headers if needed
//             "x-custom-header": "value",
//           };
//         }
//         return {};
//       },
//       queryClientConfig: {
//         defaultOptions: {
//           queries: {
//             refetchOnWindowFocus: false,
//           },
//         },
//       },
//     };
//   },
//   ssr: false, // Disable SSR (server-side rendering) if not needed
// });

// import { createTRPCNext } from "@trpc/next";
// import { type AppRouter } from "@/server";

// export const trpc = createTRPCNext<AppRouter>({
//   config() {
//     return {
//       url: "/api/trpc", // Replace this with your tRPC API endpoint
//     };
//   },
//   ssr: true, // Enable SSR (set to false if you don't want it)
// });
