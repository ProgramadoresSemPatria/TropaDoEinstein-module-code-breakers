import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ProviderWrapper } from "@/contexts/ProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Borderless Code",
  description: "Borderless Code - Neetcode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ProviderWrapper>
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </ProviderWrapper>
      </body>
    </html>
  );
}
