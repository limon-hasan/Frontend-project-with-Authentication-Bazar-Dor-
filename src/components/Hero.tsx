"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const formatted = today.toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDate(formatted);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-[#f6fbf7] border border-[#e4ebe4] rounded-[32px] p-6 sm:p-10 md:p-12 my-6 shadow-xs overflow-hidden relative">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-4">
        <div className="flex-1 space-y-5 text-center md:text-left">
          <div className="inline-block bg-[#e2f5e8] text-[#117c43] text-xs sm:text-sm font-bold px-3.5 py-1 rounded-full">
            {currentDate || "শনিবার, ১০ অক্টোবর, ২০২৬"}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0f2919] leading-tight select-none">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="pt-2">
            <a
              href="#sob-ponno"
              className="inline-block bg-[#008f4c] hover:bg-[#007a41] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-[0_4px_12px_rgba(0,143,76,0.18)] hover:shadow-[0_6px_16px_rgba(0,143,76,0.25)] transition-all"
            >
              সব পণ্য দেখুন
            </a>
          </div>
        </div>

        <div className="w-full md:w-[40%] flex justify-center items-center relative">
          <div className="absolute bottom-2 w-48 h-6 bg-black/5 blur-md rounded-full" />

          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 select-none">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্য ও সবজি ঝুড়ি"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
