import Link from "next/link";
import Image from "next/image";
import CurrentDate from "@/components/CurrentDate";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo ebong Real-time Client Date Section */}
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
              {/* Client Component: Next.js 15 prerender warning completely dur hobe */}
              <CurrentDate />
            </div>
          </Link>

          {/* Sign In ebong Sign Up Buttons */}
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
      </div>
    </header>
  );
}
