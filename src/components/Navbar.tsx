import Link from "next/link";
import Image from "next/image";
import CurrentDate from "@/components/CurrentDate";

// ৮টি মূল ক্যাটাগরির তালিকা ও আইকন
const categories = [
  { id: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "shobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dudh", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "moshla", nameBn: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* উপরের রো: লোগো, তারিখ এবং সাইন ইন / সাইন আপ */}
        <div className="flex items-center justify-between h-20 border-b border-gray-100/80">
          {/* লোগো এবং রিয়েল-টাইম ক্লায়েন্ট তারিখ */}
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

          {/* সাইন ইন ও সাইন আপ বাটন (সবুজ ড্রপ-শ্যাডো সহ) */}
          <div className="flex items-center gap-5">
            <Link
              href="/signin"
              className="text-sm sm:text-base font-bold text-gray-800 hover:text-emerald-700 transition-colors"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="inline-flex items-center justify-center text-sm sm:text-base font-bold text-white bg-[#058a44] hover:bg-[#04753a] px-5 py-2.5 rounded-xl shadow-lg shadow-[#058a44]/35 hover:shadow-xl hover:shadow-[#058a44]/45 transition-all active:scale-95"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Nicher row: 8-ti category list (Logo-r shathe left-align kora) */}
        <nav className="flex items-center justify-start gap-5 sm:gap-8 py-3 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold text-gray-700">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.id}`}
              className="inline-flex items-center gap-1.5 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 group py-1"
            >
              <span className="text-base group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span>{cat.nameBn}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
