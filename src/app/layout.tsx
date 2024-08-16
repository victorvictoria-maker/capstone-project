import type { Metadata } from "next";

import { Poppins } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { cn } from "@/lib/utils";

const fontSans = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// import { Poppins } from "next/font/google";
// const font = Poppins({
//   subsets: ["latin"],
//   weight: ["600"],
// });

export const metadata: Metadata = {
  title: {
    template: "%s | Care Connect",
    default: "Care Connect",
  },
  description: "Finding the right care for you.",
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
          fontSans.className
        )}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
