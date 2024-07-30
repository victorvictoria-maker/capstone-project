import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils";
import { auth } from "../../auth";
import { SessionProvider } from "next-auth/react";

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
    <SessionProvider>
      <html lang='en'>
        {/* <body className={inter.className}>{children}</body> */}
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
    </SessionProvider>
  );
}
