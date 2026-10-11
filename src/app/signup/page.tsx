"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে!");
      return;
    }

    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    setLoading(false);

    if (data) {
      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    }

    if (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে!");
      console.error(error);
    }
  };

  return (
    <main className="min-h-[85vh] flex flex-col items-center justify-center py-10 px-4">
      <div className="text-center space-y-1.5 mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="bg-white border border-gray-200/90 rounded-2xl sm:rounded-3xl shadow-xs w-full max-w-[440px] p-6 sm:p-8">
        <form onSubmit={onSubmit}>
          <fieldset className="fieldset space-y-3.5 p-0">
            <div>
              <label className="label py-1 text-xs sm:text-sm font-bold text-gray-800">
                নাম
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full bg-[#fcfdfc] border-gray-200 rounded-xl focus:border-[#058a44] focus:outline-none text-xs sm:text-sm placeholder:text-gray-400"
                placeholder="যেমন: রহিম উদ্দিন"
                required
              />
            </div>

            <div>
              <label className="label py-1 text-xs sm:text-sm font-bold text-gray-800">
                ইমেইল
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full bg-[#fcfdfc] border-gray-200 rounded-xl focus:border-[#058a44] focus:outline-none text-xs sm:text-sm placeholder:text-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="label py-1 text-xs sm:text-sm font-bold text-gray-800">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full bg-[#fcfdfc] border-gray-200 rounded-xl focus:border-[#058a44] focus:outline-none text-xs sm:text-sm placeholder:text-gray-400"
                placeholder="কমপক্ষে ৮ অক্ষর"
                required
              />
            </div>

            <div>
              <label className="label py-1 text-xs sm:text-sm font-bold text-gray-800">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="input input-bordered w-full bg-[#fcfdfc] border-gray-200 rounded-xl focus:border-[#058a44] focus:outline-none text-xs sm:text-sm placeholder:text-gray-400"
                placeholder="আবার লিখুন"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-[#058a44] hover:bg-[#04753a] text-white font-bold rounded-xl border-none shadow-md shadow-[#058a44]/25 hover:shadow-lg transition-all active:scale-[0.98] mt-3 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
            </button>
          </fieldset>
        </form>

        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-gray-200 w-full" />
          <span className="bg-white px-3 text-xs text-gray-500 font-medium absolute">
            অথবা
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:text-gray-800 bg-white rounded-xl text-[11px] sm:text-xs font-semibold text-gray-700 h-auto py-2.5 px-3 normal-case"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="whitespace-nowrap">Google দিয়ে চালিয়ে যান</span>
          </button>

          <button
            type="button"
            className="btn btn-outline border-gray-200 hover:bg-gray-50 hover:text-gray-800 bg-white rounded-xl text-[11px] sm:text-xs font-semibold text-gray-700 h-auto py-2.5 px-3 normal-case"
          >
            <svg
              className="w-4 h-4 shrink-0 fill-current text-gray-800"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className="whitespace-nowrap">GitHub দিয়ে চালিয়ে যান</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-600 font-medium pt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="text-emerald-700 font-bold hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <div className="mt-8">
        <Link
          href="/"
          className="text-xs text-gray-500 hover:text-gray-900 transition-colors font-medium flex items-center gap-1.5"
        >
          <span>←</span>
          <span>হোম পেজে ফিরে যান</span>
        </Link>
      </div>
    </main>
  );
}
