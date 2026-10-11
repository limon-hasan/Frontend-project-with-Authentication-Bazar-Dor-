"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import CurrentDate from "@/components/CurrentDate";
import UserInfo from "./UserInfo";

const categories = [
  { id: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", nameBn: "তেল", icon: "🧴" },
  { id: "shobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dudh", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "moshla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  // ১. বর্তমান পেজের ইউআরএল পাথ ট্র্যাক করা
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* লোগো এবং সাইন ইন / সাইন আপ */}
        <div className="flex items-center justify-between h-20 border-b border-gray-100/80">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#007a3d] flex items-center justify-center p-2.5 shadow-xs shrink-0">
              <Image
                src="/logo-icon.png"
                alt="বাজার দর"
                width={32}
                height={32}
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight block leading-tight">
                বাজার দর
              </span>
              <CurrentDate />
            </div>
          </Link>

          <UserInfo />
        </div>

        {/* ক্যাটাগরি তালিকা (অ্যাক্টিভ হলে সবুজ ক্যাপসুল হাইলাইট) */}
        <nav className="flex items-center justify-start gap-2.5 sm:gap-3 py-2.5 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold">
          {categories.map((cat) => {
            // ২. বর্তমান ইউআরএল এই ক্যাটাগরির সাথে মিলছে কি না চেক করা
            const isActive = pathname === `/category/${cat.id}`;

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? "bg-[#007a3d] text-white font-bold shadow-xs scale-100" // স্ক্রিনশটের মতো সবুজ ব্যাকগ্রাউন্ড
                    : "text-gray-700 hover:text-emerald-700 hover:bg-gray-50"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
