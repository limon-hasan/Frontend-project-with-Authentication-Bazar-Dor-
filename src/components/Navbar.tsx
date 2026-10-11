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
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <nav className="flex items-center justify-start gap-2 py-3 overflow-x-auto no-scrollbar text-xs sm:text-sm font-medium">
          {categories.map((cat) => {
            const currentPath = decodeURIComponent(pathname);
            const isActive =
              currentPath === `/category/${cat.id}` ||
              currentPath.startsWith(`/category/${cat.id}/`);

            return (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? "bg-[#007a3d] text-white font-semibold shadow-xs"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80"
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
