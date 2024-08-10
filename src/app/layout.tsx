import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Care Finder App App",
  description: "App for finding hospitals near you!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          // "min-h-screen bg-background font-sans antialiased",
          "font-sans",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
