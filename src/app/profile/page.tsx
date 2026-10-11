"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("লগআউট সফল হয়েছে!");
    router.push("/signin");
    router.refresh();
  };

  if (isPending) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center">
        <div className="text-sm font-semibold text-gray-500">
          প্রোফাইল তথ্য লোড হচ্ছে...
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-[80vh] py-10 px-4 max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          আমার প্রোফাইল
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-2xl font-black text-emerald-700 bg-emerald-50 w-full h-full flex items-center justify-center">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
              {user.name}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {user.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1.5 px-4 py-2 border border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95"
        >
          <span>↩</span>
          <span>সাইন আউট</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl shadow-xs p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-gray-900">
              ব্যক্তিগত তথ্য
            </h3>
            <p className="text-xs text-gray-500">
              আপনার বর্তমান নাম ও প্রোফাইল বিবরণী
            </p>
          </div>
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#058a44] hover:bg-[#04753a] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>✏️</span>
            <span>তথ্য পরিবর্তন করুন</span>
          </Link>
        </div>

        <div className="divide-y divide-gray-100 text-xs sm:text-sm pt-2">
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-gray-500 font-medium">নাম:</span>
            <span className="text-gray-900 font-semibold">
              {user.name || "দেওয়া নেই"}
            </span>
          </div>
          <div className="py-2.5 flex justify-between items-center">
            <span className="text-gray-500 font-medium">ইমেইল:</span>
            <span className="text-gray-900 font-semibold">{user.email}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
