"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CATEGORIES = [
  { name: "চাল", slug: "chal", emoji: "🍚" },
  { name: "ডাল", slug: "dal", emoji: "🫘" },
  { name: "তেল", slug: "oil", emoji: "🧴" },
  { name: "সবজি", slug: "vegetable", emoji: "🥬" },
  { name: "মাছ", slug: "fish", emoji: "🐟" },
  { name: "মাংস", slug: "meat", emoji: "🍗" },
  { name: "ডিম-দুধ", slug: "egg-milk", emoji: "🥛" },
  { name: "মসলা", slug: "spice", emoji: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
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
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center p-2 shadow-sm group-hover:bg-emerald-800 transition-colors">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর লোগো"
              width={24}
              height={24}
              className="object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              {currentDate || "শনিবার, ১০ অক্টোবর, ২০২৬"}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/signin"
            className="text-sm font-semibold text-gray-700 hover:text-emerald-700 px-3 py-1.5 transition-colors"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-1.5 rounded-lg shadow-sm transition-all"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-100 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
