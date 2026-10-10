import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজার দর এক নজরে",
  description: "নিত্যপ্রয়োজনীয় পণ্যের বাজার দর, বিশ্লেষণ এবং পরিবর্তন",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f6f4] text-gray-800">
        <Navbar />
        <Marquee />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4">{children}</main>
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
