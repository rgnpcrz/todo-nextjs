import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "./_trpc/Provider";

export const metadata: Metadata = {
  title: "rgnpcrz ve2max",
  description: "Generated by create next app, developed by rgnpcrz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-dvh     antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
