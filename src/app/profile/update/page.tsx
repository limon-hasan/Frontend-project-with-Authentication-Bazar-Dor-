"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [updating, setUpdating] = useState(false);

  // লগইন না থাকলে সাইন-ইন পেজে রিডাইরেক্ট
  useEffect(() => {
    if (!isPending && !user) {
      router.push("/signin");
    }
  }, [isPending, user, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const trimmedName = (formData.get("name") as string)?.trim();

    if (!trimmedName) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    setUpdating(true);

    try {
      const res = await authClient.updateUser({
        name: trimmedName,
      });

      if (res?.error) {
        toast.error(res.error.message || "নাম আপডেট করতে সমস্যা হয়েছে!");
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 300);
      }
    } catch (err) {
      toast.error("আপডেট করার সময় সমস্যা হয়েছে!");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center">
        <div className="text-sm font-semibold text-gray-500">
          তথ্য লোড হচ্ছে...
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-[460px] space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
          </p>
        </div>

        <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl shadow-xs p-6 sm:p-8">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-800 block">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name || ""}
                placeholder="আপনার নাম লিখুন"
                className="w-full bg-[#fcfdfc] border border-gray-200 text-gray-900 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:border-emerald-600"
                required
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full py-3 bg-[#058a44] hover:bg-[#04753a] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-[#058a44]/25 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:bg-gray-300 disabled:text-gray-500"
            >
              {updating ? "আপডেট হচ্ছে..." : "Update Information"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <Link
              href="/profile"
              className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium inline-flex items-center gap-1"
            >
              <span>←</span>
              <span>প্রোফাইলে ফিরে যান</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
