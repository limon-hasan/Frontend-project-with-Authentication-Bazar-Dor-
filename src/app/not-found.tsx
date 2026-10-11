import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 text-[#058a44] font-black text-3xl mb-4 border border-emerald-100 shadow-xs">
        ৪০৪
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
        পৃষ্ঠাটি পাওয়া যায়নি
      </h1>
      <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 font-medium">
        আপনি যে পৃষ্ঠাটি খুঁজছেন তা সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা
        বর্তমানে অনুপলব্ধ রয়েছে।
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#058a44] hover:bg-[#04753a] text-white font-bold text-sm rounded-xl shadow-md shadow-[#058a44]/25 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
      >
        <span>←</span>
        <span>হোম পেজে ফিরে যান</span>
      </Link>
    </main>
  );
}
