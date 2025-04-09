import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import  Sidebar  from "@/components/Sidebar";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " Fuel Dahsboard",
  description: " Fuel Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="flex">
          <div className="hidden md:block h-[100vh] w-[300px] ">
          <Sidebar />
          </div>
         <main className=" p-5 w-full md:max-w-[1440px]">{children}</main>
        
        </div>
      </body>
    </html>
  );
}
