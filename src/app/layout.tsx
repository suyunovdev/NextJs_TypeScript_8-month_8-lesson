"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body>
          <Header />
          <QueryClientProvider client={queryClient}>
            <main className="px-20">{children}</main>
          </QueryClientProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
